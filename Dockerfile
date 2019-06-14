FROM node:12.3.1-alpine

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN mdkir /app && chown /app node:node
WORKDIR /app

COPY . /app

EXPOSE 5000

ENTRYPOINT ["sh", "./entrypoint.sh"]

CMD ["node", "./server"]
