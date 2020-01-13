FROM node:13.1.0-alpine

RUN apk add -u --no-cache make g++ python util-linux 

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn --pure-lockfile
ADD . .
RUN yarn build

FROM node:13.1.0-alpine
COPY --from=0 /app /app
WORKDIR /app
EXPOSE 80 31337/udp

VOLUME /app/dist/client

ENTRYPOINT "./entrypoint.sh"
