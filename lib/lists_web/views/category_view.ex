defmodule ListsWeb.CategoryView do
  use ListsWeb, :view

  def render("index.json", %{categories: categories }) do
    %{data: render_many(categories, ListsWeb.CategoryView, "category.json")}
  end

  def render("show.json", %{category: category}) do
    %{data: render_one(category, ListsWeb.CategoryView, "category.json")}
  end

  def render("category.json", %{category: category}) do
    %{  id: category.id,
        name: category.name,
        description: category.description,
        lists: render_many(category.lists, ListsWeb.ListView, "list.json")
      }
  end

end
