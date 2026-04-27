.ONESHELL:
.SILENT:

BURLA_VERSION = 0.1.0
WEBSERVICE_NAME = burla-landing-page
PYTHON_MODULE_NAME = landing_page
SERVICE_PORT = 5002
USER_DOCS_PATH ?= ../user-docs

ARTIFACT_REPO_NAME := $(WEBSERVICE_NAME)
ARTIFACT_PKG_NAME := $(WEBSERVICE_NAME)

.PHONY: build-frontend deploy-test publish deploy-prod image container service
build-frontend:
	set -e; \
	pgrep -f "rsync -a --delete" >/dev/null && exit 0; \
	DOCS_PATH=$$(cd "$(USER_DOCS_PATH)" && pwd); \
	[ -e ./frontend/public/gitbook-assets ] || ln -s "$${DOCS_PATH}/.gitbook/assets" ./frontend/public/gitbook-assets; \
	cd ./frontend; \
	USER_DOCS_PATH="$${DOCS_PATH}" npm i; \
	USER_DOCS_PATH="$${DOCS_PATH}" npm run build; \
	rsync -a --delete --exclude='.*' --exclude='login.html.j2' dist/ ../src/landing_page/static/

deploy-test:
	set -e; \
	PROJECT_ID=$$(gcloud config get-value project 2>/dev/null); \
	TEST_IMAGE_BASE_NAME=$$( echo \
		"us-docker.pkg.dev/$${PROJECT_ID}/$(ARTIFACT_REPO_NAME)/$(ARTIFACT_PKG_NAME)" \
	); \
	TEST_IMAGE_TAG=$$( \
		gcloud artifacts tags list \
			--package=$(ARTIFACT_PKG_NAME) \
			--location=us \
			--repository=$(ARTIFACT_REPO_NAME) \
			--project $${PROJECT_ID} \
			2>&1 | grep -Eo '^[0-9]+' | sort -n | tail -n 1 \
	); \
	TEST_IMAGE_NAME=$${TEST_IMAGE_BASE_NAME}:$${TEST_IMAGE_TAG}; \
	gcloud run deploy $(WEBSERVICE_NAME) \
		--image=$${TEST_IMAGE_NAME} \
		--project $${PROJECT_ID} \
		--region=us-central1 \
		--service-account $(WEBSERVICE_NAME)@$${PROJECT_ID}.iam.gserviceaccount.com \
		--min-instances 0 \
		--max-instances 5 \
		--memory 2Gi \
		--cpu 1 \
		--timeout 360 \
		--concurrency 20 \
		--allow-unauthenticated; \
	gcloud run services update-traffic $(WEBSERVICE_NAME) \
		--project $${PROJECT_ID} \
		--region=us-central1 \
		--to-latest

publish:
	set -e; \
	PROJECT_ID=$$(gcloud config get-value project 2>/dev/null); \
	TEST_IMAGE_BASE_NAME=$$( echo \
		"us-docker.pkg.dev/$${PROJECT_ID}/$(ARTIFACT_REPO_NAME)/$(ARTIFACT_PKG_NAME)" \
	); \
	TEST_IMAGE_TAG=$$( \
		gcloud artifacts tags list \
			--package=$(ARTIFACT_PKG_NAME) \
			--location=us \
			--repository=$(ARTIFACT_REPO_NAME) \
			--project $${PROJECT_ID} \
			2>&1 | grep -Eo '^[0-9]+' | sort -n | tail -n 1 \
	); \
	TEST_IMAGE_NAME=$${TEST_IMAGE_BASE_NAME}:$${TEST_IMAGE_TAG}; \
	PROD_IMAGE_BASE_NAME=$$( echo \
		"us-docker.pkg.dev/burla-prod/$(ARTIFACT_REPO_NAME)/$(ARTIFACT_PKG_NAME)" \
	); \
	docker tag $${TEST_IMAGE_NAME} $${PROD_IMAGE_BASE_NAME}:$(BURLA_VERSION); \
	docker push $${PROD_IMAGE_BASE_NAME}:$(BURLA_VERSION)

deploy-prod:
	set -e; \
	$(MAKE) publish

image:
	set -e; \
	PROJECT_ID=$$(gcloud config get-value project 2>/dev/null); \
	TEST_IMAGE_BASE_NAME=$$( echo \
		"us-docker.pkg.dev/$${PROJECT_ID}/$(ARTIFACT_REPO_NAME)/$(ARTIFACT_PKG_NAME)" \
	); \
	TEST_IMAGE_TAG=$$( \
		gcloud artifacts tags list \
			--package=$(ARTIFACT_PKG_NAME) \
			--location=us \
			--repository=$(ARTIFACT_REPO_NAME) \
			--project $${PROJECT_ID} \
			2>&1 | grep -Eo '^[0-9]+' | sort -n | tail -n 1 \
	); \
	NEW_TEST_IMAGE_TAG=$$(($${TEST_IMAGE_TAG} + 1)); \
	TEST_IMAGE_NAME_SEQUENTIAL=$$( echo $${TEST_IMAGE_BASE_NAME}:$${NEW_TEST_IMAGE_TAG} ); \
	TEST_IMAGE_NAME_LATEST=$$( echo $${TEST_IMAGE_BASE_NAME}:latest ); \
	docker build --platform linux/amd64 -t $${TEST_IMAGE_NAME_SEQUENTIAL} .; \
	docker tag $${TEST_IMAGE_NAME_SEQUENTIAL} $${TEST_IMAGE_NAME_LATEST}; \
	docker push $${TEST_IMAGE_NAME_SEQUENTIAL}; \
	docker push $${TEST_IMAGE_NAME_LATEST}; \
	echo "Successfully built Docker Image:"; \
	echo "$${TEST_IMAGE_NAME_SEQUENTIAL}"; \
	echo "$${TEST_IMAGE_NAME_LATEST}"; \
	echo "";

container:
	set -e; \
	PROJECT_ID=$$(gcloud config get-value project 2>/dev/null); \
	TEST_IMAGE_NAME=$$( echo \
		"us-docker.pkg.dev/$${PROJECT_ID}/$(ARTIFACT_REPO_NAME)/$(ARTIFACT_PKG_NAME):latest" \
	); \
	docker run --rm -it \
		--name landing_page \
		-v $(PWD):/burla/landing_page \
		-v ~/.config/gcloud:/root/.config/gcloud \
		-e GOOGLE_CLOUD_PROJECT=$${PROJECT_ID} \
		-e HOST_PWD=$(PWD) \
		-e HOST_HOME_DIR=$${HOME} \
		-p $(SERVICE_PORT):$(SERVICE_PORT) \
		--entrypoint /bin/bash \
		$${TEST_IMAGE_NAME}

service:
	set -e; \
	PYTHONPATH=./src uv run --project . --with fastapi --with uvicorn python -m uvicorn $(PYTHON_MODULE_NAME):app \
		--host 0.0.0.0 \
		--port $(SERVICE_PORT) \
		--reload
