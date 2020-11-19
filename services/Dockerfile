# ----- Base ----- #

FROM node:12.16.3-alpine AS base

WORKDIR /usr/src/app


# ----- development ----- #

FROM base AS development

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:debug"]


# ----- Builder ----- #

FROM base AS builder

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# ----- Release ----- #

FROM base AS release 

COPY --from=builder  /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/dist ./dist

COPY . .

CMD ["npm", "run", "start:prod"]
