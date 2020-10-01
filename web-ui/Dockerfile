### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:12-alpine as builder

WORKDIR /usr/src/ng-app


COPY package.json package-lock.json ./

# Install required dependencies
RUN npm install

# Copy everything from host to /ng-app in the container
COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build:prod



### STAGE 2: Setup ###

FROM nginx:1.17.9-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/


## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /usr/src/ng-app/dist/employees /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
