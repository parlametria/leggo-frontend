# build stage
FROM node:10-alpine

WORKDIR /app
COPY *.js* ./
RUN npm install
COPY .env* ./

EXPOSE 8080
CMD npm run serve
