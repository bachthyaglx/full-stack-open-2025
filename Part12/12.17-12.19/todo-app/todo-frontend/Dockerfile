# Build stage
FROM node:20 AS build

WORKDIR /app
COPY . .

# Pass in ENV before build
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm ci
RUN npm run test 
RUN npm run build

# Serve stage
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html
