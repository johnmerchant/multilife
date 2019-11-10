FROM ubuntu:19.04 AS base

# setup base

SHELL ["/bin/bash", "-c"]
ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update -y
RUN apt-get install -y software-properties-common curl
RUN add-apt-repository universe
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get upgrade -y && apt-get install -y nodejs yarn

# build multilife
FROM base AS build
RUN apt-get install -y build-essential
RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn --pure-lockfile
ADD . .
RUN yarn build

# add nginx, pm2, certbot
FROM base AS prod

RUN add-apt-repository ppa:certbot/certbot
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y \
    nginx \
    certbot \
    python-certbot-nginx

# purge apt cache
RUN rm -rf /var/lib/apt/lists/* 

# install pm2
RUN yarn global add pm2

# copy app dist
COPY --from=build /app/dist /app/entrypoint.sh /app/process.yml /app/node_modules /app/

# purge yarn cache
RUN yarn cache clean

WORKDIR /app

COPY nginx.conf /etc/nginx/sites-enabled/multilife.live

EXPOSE 80 443 31337/udp

ENTRYPOINT "./entrypoint.sh"