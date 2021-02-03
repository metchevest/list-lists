# File: my_app/entrypoint.sh
#!/bin/bash
# docker entrypoint script.

# assign a default for the database_user
DB_USER=${DATABASE_USER:-postgres}

# wait until Postgres is ready
while ! pg_isready -q -h "db" -p 5432 -U "postgres"
do
  echo "$(date) - waiting for database to start"
  sleep 2
done
echo "about to start the app"
bin/lists eval "Lists.Release.create_and_migrate()"

bin="bin/lists"

# start the elixir application
exec "$bin" "start"

# bin/lists start