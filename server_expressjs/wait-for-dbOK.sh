#!/bin/bash
# wait-for-db.sh

set -e

host="$1"
shift
cmd="$@"

echo "⏳ Waiting for database at $host..."

# Boucle jusqu'à ce que la DB réponde
until nc -z -v -w30 $(echo $host | cut -d/ -f3 | cut -d: -f1) $(echo $host | cut -d: -f2); do
  echo "⏱ Database not ready yet..."
  sleep 2
done

echo "✅ Database is up!"

# Appliquer les migrations Prisma
echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

# Lancer le serveur
exec $cmd
