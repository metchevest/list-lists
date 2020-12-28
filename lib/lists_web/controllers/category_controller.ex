defmodule ListsWeb.CategoryController do
  use ListsWeb, :controller

  alias Lists.Categories

  def show(conn, %{"id" => id}) do
    render_show(conn, Categories.get_category(id))
  end

  defp render_show(conn, nil) do
    conn
    |> put_status(404)
    |> render("404.json", error: "Category not found")
  end

  defp render_show(conn, category) do
    render(conn, "one_category.json", category: category)
  end

  def index(conn, _params) do
    categories = Categories.list_categories()

    render(conn, "index.json", categories: categories)
  end

  def delete(conn, %{"id" => id}) do
    render_delete(conn, Categories.get_category(id))
  end

  defp render_delete(conn, nil) do
    conn
    |> put_status(404)
    |> render("404.json", error: "Category not found")
  end

  defp render_delete(conn, category) do
    case Categories.delete_category(category) do
      {:ok, category} ->
        conn
        |> put_status(204)
        |> render("one_category.json", category: category)

      {:error, message} ->
        conn
        |> put_status(404)
        |> render("404.json", error: inspect(message.errors))
    end
  end

  def create(conn, %{"category" => params}) do
    case Categories.create_category(params) do
      {:ok, category} ->
        render(conn, "one_category.json", category: category)

      {:error, message} ->
        conn
        |> put_status(422)
        |> render("404.json", error: inspect(message.errors))
    end
  end

  def update(conn, %{"id" => id, "category" => category_params}) do
    render_update(conn, Categories.get_category(id), category_params)
  end

  defp render_update(conn, nil, _category_params) do
    render(conn, "404.json", error: "Category not found")
  end

  defp render_update(conn, category, category_params) do
    case Categories.update_category(category, category_params) do
      {:ok, category} ->
        render(conn, "one_category.json", category: category)

      {:error, message} ->
        conn
        |> put_status(422)
        |> render("404.json", error: inspect(message.errors))
    end
  end

  def new_user_category(conn, params) do
    IO.inspect(params)

    case Categories.new_user_category(params) do
      nil ->
        render(conn, "error.jason")

      category ->
        IO.puts("en new_user_Category")
        render(conn, "one_category.json", category: category)
    end
  end

  def get_user_categories(conn, params) do
    categories = Categories.list_user_categories(params)
    render(conn, "index.json", categories: categories)
  end
end
