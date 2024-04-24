FROM node:20.11.1-alpine as build


WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run react-server-start
