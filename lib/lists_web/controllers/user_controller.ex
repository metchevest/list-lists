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

  def login_user(conn, %{"google_user_id" => google_id}) do
    IO.puts "login_user controller"
    IO.inspect(google_id)
    user = Accounts.user_logged_by_google_id(google_id)
    render(conn, "justuser.json", user: user)

  end

end
