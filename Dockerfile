FROM node:22-alpine as build

ARG API_KEY

WORKDIR /app
COPY . .
RUN echo "VITE_API_HOSTNAME=$($API_HOSTNAME)" >> .env

RUN npm ci
RUN npm run build-only -- --mode docker

FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]