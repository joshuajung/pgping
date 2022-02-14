FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN apk add nano
RUN apk add curl
CMD yarn start
