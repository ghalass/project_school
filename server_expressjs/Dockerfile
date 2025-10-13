# Dockerfile for Express.js server with Prisma (server_expressjs/Dockerfile)

FROM node:22.12.0

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Génère Prisma Client
RUN npx prisma generate

# Installer netcat pour le wait-for-db.sh
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# Copie du script wait-for-db
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

EXPOSE 5001

# Lance d'abord wait-for-db.sh puis le serveur
CMD ["/wait-for-db.sh", "npm", "start"]
