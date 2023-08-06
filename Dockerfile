FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

COPY ./src ./src
COPY ./prisma ./prisma/
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install \
    && npm run build \
    && npm cache clean --force

RUN npx prisma generate

EXPOSE ${PORT}

CMD [ "npm", "run", "prisma:start" ]