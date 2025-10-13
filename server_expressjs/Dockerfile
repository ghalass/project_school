# Dockerfile for Express.js server with Prisma (server_expressjs/Dockerfile)

FROM node:22.12.0

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Génération Prisma Client
RUN npx prisma generate

EXPOSE 5001
CMD ["npm", "start"]
