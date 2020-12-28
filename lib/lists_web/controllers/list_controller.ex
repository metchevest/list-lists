defmodule ListsWeb.ListController do
  use ListsWeb, :controller

  alias Lists.Array

  def show(conn, %{"id" => id}) do
    list = Array.get_list!(id)

    render(conn, "list.json", list: list)
  end

  def new_list(conn, params) do
    list = Array.create_list_by_google_id(params)
    render(conn, "list.json", list: list)
  end

  def get_user_lists(conn, %{"google_user_id" => id}) do
    lists = Array.get_user_lists_by_google_id(id)
    render(conn, "index.json", lists: lists)
  end

  def get_user_list(conn, %{"google_user_id" => google_id, "list_id" => list_id}) do
    case Array.get_user_list(google_id, list_id) do
      nil -> render(conn, "list_error.json", %{})
      list -> render(conn, "list.json", list: list)
    end
  end

  def delete_list(conn, %{"google_user_id" => google_id, "list_id" => list_id}) do
    Array.delete_user_list(google_id, list_id)
    render(conn, "listid.json", list_id: list_id)
  end

  def edit_list(conn, params) do
    list = Array.edit_list(params)
    render(conn, "list.json", list: list)
  end

  def update_categories(conn, params) do
    list = Array.update_list_categories(params)
    render(conn, "list.json", list: list)
  end
end
