# FROM bitwalker/alpine-elixir-phoenix:latest

# # Set exposed ports
# EXPOSE 5000
# ENV PORT=5000 MIX_ENV=dev

# #Install postgres client
# RUN apk --update add postgresql-client

# # Cache elixir deps
# ADD mix.exs mix.lock ./
# RUN mix do deps.get, deps.compile

# # Same with npm deps
# ADD assets/package.json assets/
# RUN cd assets && \
#     npm install

# ADD . .

# USER default

# CMD ["./entrypoint.sh"]

FROM elixir:1.9.0-alpine AS build

# install build dependencies
RUN apk add --no-cache build-base npm git python

# prepare build dir
WORKDIR /app

# install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# set build ENV
ENV MIX_ENV=prod

# install mix dependencies
COPY mix.exs mix.lock ./
COPY config config

# RUN mix phx.gen.secret

RUN mix do deps.get, deps.compile

# build assets
COPY assets/package.json assets/package-lock.json ./assets/
RUN npm --prefix ./assets ci --progress=false --no-audit --loglevel=error

COPY priv priv
COPY assets assets
RUN npm run --prefix ./assets deploy
RUN mix phx.digest

# compile and build release
COPY lib lib
# uncomment COPY if rel/ exists
# COPY rel rel
RUN mix do compile, release

# prepare release image
FROM alpine:3.9 AS app
RUN apk add --no-cache openssl ncurses-libs

###########################
# install runtime dependencies
RUN apk add --update bash openssl postgresql-client

RUN apk add inotify-tools
###########################

WORKDIR /app

RUN chown nobody:nobody /app

USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/lists ./

ENV HOME=/app

# RUN /app/_build/dev/rel/lists/bin/lists eval "Lists.Release.migrate"

# RUN bin/lists eval "Lists.Release.createdb()"

# CMD ["bin/lists", "start"]
ADD . .

# RUN chmod +x ./wait-for-postgres.sh
CMD ["bash", "entrypoint.sh"]

# CMD ["bin/lists", "start"]