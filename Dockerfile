FROM node:gallium-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE ${PORT}

CMD ["npm", "run", "prisma:start"]