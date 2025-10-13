#!/bin/sh
# wait-for-db.sh : attend que la DB MySQL soit prête, applique les migrations Prisma, puis démarre le serveur

echo "🔄 Waiting for MySQL at db_my_school:3306..."

until nc -z db_my_school 3306; do
  echo "⏳ MySQL not ready, waiting 2s..."
  sleep 2
done

echo "✅ MySQL is up!"

# Appliquer les migrations Prisma
echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

# Lancer le serveur
echo "🚀 Starting backend..."
exec "$@"
