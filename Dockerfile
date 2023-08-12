FROM node:gallium-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

RUN npx prisma generate

FROM node:gallium-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE ${PORT}

CMD [ "npm", "run", "prisma:start" ]
