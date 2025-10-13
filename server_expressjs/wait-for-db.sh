#!/bin/sh
# wait-for-db.sh : attend que la DB MySQL soit prête avant de démarrer le serveur

echo "Waiting for MySQL at db_my_school:3306..."

until nc -z db_my_school 3306; do
  echo "MySQL not ready, waiting 2s..."
  sleep 2
done

echo "MySQL is up! Starting backend..."
exec "$@"
