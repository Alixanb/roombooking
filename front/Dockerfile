FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_ROOM_BOOKING_API=http://localhost:5010
ENV VITE_ROOM_BOOKING_API=$VITE_ROOM_BOOKING_API
RUN npm run build-only

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
