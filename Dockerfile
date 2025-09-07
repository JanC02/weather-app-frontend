FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_PROXY_URL

ENV VITE_API_PROXY_URL=$VITE_API_PROXY_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80