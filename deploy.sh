#!/bin/bash

set -e

DOCKER_IMAGE=$1
CONAINER_NAME="multilife.live"

docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME
docker run --name $CONTAINER_NAME \ 
    --net="host" \
    -v /etc/nginx/:/etc/nginx/ \
    -v /etc/ssl/certs/:/etc/ssl/certs/ \
    -v /etc/letsencrypt/:/etc/letsencrypt/ \
    -v /var/log/nginx/:/var/log/nginx/ \
    --restart=always \
    -d $DOCKER_IMAGE