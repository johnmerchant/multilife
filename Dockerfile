FROM ubuntu:latest AS ubuntu-base

# setup base

SHELL ["/bin/bash", "-c"]
ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update -y
RUN apt-get install -y software-properties-common curl
RUN add-apt-repository universe
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add
RUN apt-get update && apt-get upgrade -y && apt-get install -y nodejs
RUN apt-get remove -y cmdtest
RUN apt-get install -y --no-install-recommends yarn

# build multilife
FROM ubuntu-base AS build
RUN apt-get install -y build-essential
RUN apt-get remove -y cmdtest
RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/ 
RUN yarn
ADD . ./app/
RUN yarn build

# add nginx, pm2, certbot
FROM ubuntu-base AS prod

RUN add-apt-repository ppa:certbot/certbot
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    nginx \
    certbot \
    python-certbot-nginx

RUN yarn global add pm2

COPY --from=build /app /app
WORKDIR /app

ADD ./docker/entrypoint.sh entrypoint.sh

ENTRYPOINT "./entrypoint.sh"