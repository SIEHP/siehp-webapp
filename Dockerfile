FROM node:18-alpine
WORKDIR /usr/src/siehp-webapp
COPY package.json ./
COPY package-lock.json ./
COPY . .
EXPOSE 3000