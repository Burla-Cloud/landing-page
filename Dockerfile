FROM python:3.13

RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:${PATH}"

ADD . /burla/landing_page
WORKDIR /burla/landing_page
RUN uv pip install --system -e .

CMD ["python", "-m", "uvicorn", "landing_page:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "1"]
