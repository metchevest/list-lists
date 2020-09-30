defmodule ListsWeb.UserController do
  use ListsWeb, :controller

  alias Lists.Accounts

  def index(conn, _params) do
    users = Accounts.list_users()
    json(conn, %{data: users})
  end

end
