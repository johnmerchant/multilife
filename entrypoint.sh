#!/bin/sh
service nginx start
certbot --nginx -d multilife.live,www.multilife.live -n -m john@merchant.on.net --agree-tos
pm2 start /app/process.yml --no-daemon