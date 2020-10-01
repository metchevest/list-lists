defmodule ListsWeb.CategoryController do
  use ListsWeb, :controller

  alias Lists.Categories

  def show(conn, %{"id" => id}) do
    category = Categories.get_category!(id)

    render(conn, "item.json", category: category)
  end

  def index(conn, _params) do
    categories = Categories.list_categories()

    render(conn, "index.json", categories: categories)
  end

  def create(conn, params) do
    IO.inspect params
    case Lists.Array.create_list(params) do
      {:ok, list} ->
        conn
        |>put_status(200)
        |>render("category.json", list: list)

      {:error, message} ->
        conn
        |> put_status(404)
        |> render("404.json", error: message)
    end
  end

end
