#!/bin/bash

cd ../../nexus-writer-backend || exit

docker compose down 

docker compose up --build -d 

docker compose logs prefect-worker -f

