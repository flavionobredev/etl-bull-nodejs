FROM node:16.18.0-alpine

WORKDIR /usr/import-api/app

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3001