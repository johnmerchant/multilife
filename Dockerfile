FROM node:13.1.0-alpine AS base
FROM base AS build

RUN apk add -u --no-cache make g++ python util-linux 

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn --pure-lockfile
ADD . .
RUN yarn build

FROM base
COPY --from=build /app/package.json /app/yarn.lock /app/entrypoint.sh /app/
COPY --from=build /app/dist/server /app/dist/server
COPY --from=build /app/dist/client /app/dist/client
WORKDIR /app
RUN yarn --pure-lockfile --production
EXPOSE 80 31337/udp

ENTRYPOINT "./entrypoint.sh"
