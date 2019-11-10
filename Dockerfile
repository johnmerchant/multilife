FROM jmercha/ubuntu:19.04-node-13-build

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn --pure-lockfile
ADD . .
RUN yarn build
RUN yarn cache clean

FROM jmercha/ubuntu:19.04-node-13-nginx-certbot-pm2
COPY --from=0 /app /app
WORKDIR /app
COPY nginx.conf /etc/nginx/sites-enabled/multilife.live
EXPOSE 80 443 31337/udp

ENTRYPOINT "./entrypoint.sh"