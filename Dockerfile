FROM node:13.1.0-alpine

ADD ./install-dependencies.sh install-dependencies.sh
RUN ./install-dependencies.sh --no-cache

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn --pure-lockfile
ADD . .
RUN yarn build

FROM node:13.1.0-alpine
COPY --from=0 /app /app
WORKDIR /app
EXPOSE 5000 31337/udp

ENTRYPOINT "./entrypoint.sh"