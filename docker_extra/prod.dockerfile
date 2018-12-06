# build stage
FROM node:10-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run check-lint
ARG commit_hash
ENV VUE_APP_COMMIT_HASH $commit_hash
RUN export VUE_APP_BUILD_DATE=$(date -Is) &&\
    npm run build

# production stage
FROM nginx:1.15-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
