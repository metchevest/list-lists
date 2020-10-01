defmodule ListsWeb.ListController do
  use ListsWeb, :controller

  alias Lists.Array

  def show(conn, %{"id" => id}) do
    list = Array.get_list!(id)

    render(conn, "list.json", list: list)
  end

  def index(conn, _params) do
    lists = Array.list_lists()

    render(conn, "index.json", lists: lists)
  end


end
