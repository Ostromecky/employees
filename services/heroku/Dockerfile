# ----- Base ----- #

FROM node:12.16.3-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

COPY /usr/src/app/node_modules ./node_modules

COPY  /usr/src/app/dist ./dist

COPY . .

CMD ["npm", "run", "start:prod"]
