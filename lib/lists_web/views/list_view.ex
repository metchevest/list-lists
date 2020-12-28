defmodule ListsWeb.ListView do
  use ListsWeb, :view

  def render("index.json", %{lists: lists}) do
    render_many(lists, ListsWeb.ListView, "list.json")
  end

  def render("show.json", %{user: user}) do
    render_one(user, ListsWeb.ListView, "list.json")
  end

  def render("listid.json", %{list_id: list_id}) do
    %{
      id: list_id
    }
  end

  def render("list.json", %{list: list}) do
    %{
      id: list.id,
      name: list.name,
      description: list.description,
      active: list.active,
      items: render_many(list.items, ListsWeb.ItemView, "item.json"),
      categories: render_many(list.categories, ListsWeb.CategoryView, "category_assoc.json")
    }
  end

  def render("list_error.json", %{}) do
    %{error: "not found"}
  end

  def render("list_short.json", %{list: list}) do
    %{
      id: list.id,
      name: list.name,
      description: list.description,
      active: list.active
    }
  end
end
