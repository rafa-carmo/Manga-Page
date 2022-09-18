FROM node:14.20.0-alpine3.16
WORKDIR /usr/backend
COPY package.json yarn.lock ./
RUN yarn && yarn build
COPY . .
EXPOSE 1337
