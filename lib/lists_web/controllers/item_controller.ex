defmodule ListsWeb.ItemController do
  use ListsWeb, :controller

  alias Lists.Items

  def show(conn, %{"id" => id}) do
    item = Items.get_item!(id)

    render(conn, "item.json", item: item)
  end

  def index(conn, _params) do
    items = Items.list_items()

    render(conn, "index.json", items: items)
  end

  def create(conn, %{"text" => text, "mark" => mark} ) do

  end
end
