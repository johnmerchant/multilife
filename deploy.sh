#!/bin/bash

set -e

DOCKER_IMAGE=$1
CONAINER_NAME="jmercha/multilife"

#Check for running container & stop it before starting a new one
if [ $(docker inspect -f '{{.State.Running}}' $CONAINER_NAME) = "true" ]; then
    docker stop $CONTAINER_NAME
fi

docker run -d --rm=true --name $CONTAINER_NAME $DOCKER_IMAGE
docker ps -a