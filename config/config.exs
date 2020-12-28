# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :lists,
  ecto_repos: [Lists.Repo]

# Configures the endpoint
config :lists, ListsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Zq+0l04WGl/tZKE7DCJWEYebYI6P8Yw0P6RregNKrp4JgY28eJacsD9wGBWDTnLx",
  render_errors: [view: ListsWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Lists.PubSub,
  live_view: [signing_salt: "zYXTg7oD"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :mime, :types, %{"application/xml" => ["xml"]}
# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
