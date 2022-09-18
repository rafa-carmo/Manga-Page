FROM python:3.11.0rc2-alpine3.16
WORKDIR /downloader
COPY /requirements.txt .
RUN pip install -r ./requirements.txt
COPY /*.py .
COPY settings.json .