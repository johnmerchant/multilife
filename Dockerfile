FROM node:13.1.0-alpine

ADD ./setup.sh setup.sh
RUN ./setup.sh

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