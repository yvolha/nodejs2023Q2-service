FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY ./src ./src
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install \
    && npm run build \
    && npm cache clean --force

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]