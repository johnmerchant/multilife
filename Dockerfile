FROM ubuntu:latest

SHELL ["/bin/bash", "-c"]
ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update -y
RUN apt-get install -y software-properties-common curl
RUN add-apt-repository universe
RUN add-apt-repository ppa:certbot/certbot
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add
RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y \
    nodejs \
    nginx \
    certbot \
    python-certbot-nginx \
    build-essential 
RUN apt-get install -y --no-install-recommends yarn
RUN rm -rf /var/lib/apt/lists/*
RUN yarn global add pm2

RUN mkdir /app
ADD package.json yarn.lock /app/ 

WORKDIR /app

RUN yarn

ADD . ./app
RUN yarn build

ADD ./docker/entrypoint.sh entrypoint.sh

ENTRYPOINT "./entrypoint.sh"