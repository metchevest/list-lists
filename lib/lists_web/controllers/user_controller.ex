defmodule ListsWeb.UserController do
  use ListsWeb, :controller

  alias Lists.Accounts

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    render(conn, "show.json", user: user)
  end

  def index(conn, _params) do
    users = Accounts.list_users()

    render(conn, "index.json", users: users)
  end


end
