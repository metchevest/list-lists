defmodule ListsWeb.ItemController do
  use ListsWeb, :controller

  alias Lists.Items
  alias Lists.Array

  def show(conn, %{"id" => id}) do
    render_show(conn, Items.get_item(id))
  end

  def render_show(conn, nil) do
    render(conn, "404.json", error: "not found")
  end

  def render_show(conn, item) do
    render(conn, "one_item.json", item: item)
  end

  def index(conn, _params) do
    items = Items.list_items()

    render(conn, "index.json", items: items)
  end

  def create(conn, %{"item" => params}) do
    case Items.create_item(params) do
      {:ok, item} ->
        conn
        |> put_status(201)
        |> render("one_item.json", item: item)

      {:error, message} ->
        render(conn, "404.json", error: inspect(message.errors))
    end
  end

  def new_item(conn, params) do
    Items.new_item(params)
    |> render_not_render("item.json", conn)
  end

  def get_items(conn, %{"google_user_id" => google_id, "list_id" => list_id}) do
    list = Array.get_user_list(google_id, list_id)
    render(conn, "index.json", list: list)
  end

  def delete_item(
        conn,
        params
      ) do
    item = Items.delete_user_item(params)
    render(conn, "delete.json", item_id: item.id)
  end

  def edit_item(conn, params) do
    Items.edit_item(params)
    |> render_not_render("one_item.json", conn)
  end

  def render_not_render(nil, _json, conn) do
    render(conn, "404.json", error: "not-found")
  end

  def render_not_render(item, json, conn) do
    render(conn, json, item: item)
  end
end
