# build stage
FROM node:10-alpine

COPY package*.json /
RUN npm install
ENV PATH /node_modules/.bin:$PATH

WORKDIR /app
CMD npm run serve
EXPOSE 8080
