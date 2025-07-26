# dev
FROM node:18-alpine AS dev
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

ENV NODE_ENV=development

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
