FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install


CMD ["npm","run","dev"]