from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


app = FastAPI(docs_url=None, redoc_url=None)


@app.get("/")
def landing_page():
    return FileResponse("src/landing_page/static/index.html")


app.mount("/", StaticFiles(directory="src/landing_page/static"), name="static")
