# Dockerfile for React application (client_coreui_react/Dockerfile)

# Étape 1 : build React
FROM node:22.12.0 as build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Étape 2 : serveur nginx pour le build
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=build /app/build ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
