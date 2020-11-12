FROM node:15.2.0-alpine AS base

FROM base AS build

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn --pure-lockfile
ADD . .
RUN yarn build-client && yarn build-server

FROM base
COPY --from=build /app/package.json /app/yarn.lock /app/entrypoint.sh /app/
COPY --from=build /app/dist/server /app/dist/server
COPY --from=build /app/dist/client /app/dist/client
WORKDIR /app
RUN yarn --pure-lockfile --production
EXPOSE 80 31337/udp

VOLUME /client

ENTRYPOINT "./entrypoint.sh"
