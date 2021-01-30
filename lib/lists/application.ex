defmodule Lists.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    IO.puts("es por aca baby")

    children = [
      # Start the Ecto repository
      Lists.Repo,
      # Start the Telemetry supervisor
      ListsWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Lists.PubSub},
      # Start the Endpoint (http/https)
      ListsWeb.Endpoint
      # Start a worker by calling: Lists.Worker.start_link(arg)
      # {Lists.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Lists.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ListsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
