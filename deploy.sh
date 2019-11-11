#!/bin/bash

DOCKER_IMAGE=$1
CONTAINER_NAME="multilife.live"

docker pull $DOCKER_IMAGE
docker stop $CONTAINER_NAME || true && docker rm $CONTAINER_NAME || true

docker run --name $CONTAINER_NAME \
    --net="host" \
    -v letsencrypt:/etc/letsencrypt/ \
    --restart=always \
    -d $DOCKER_IMAGE