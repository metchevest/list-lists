defmodule ListsWeb.CategoryView do
  use ListsWeb, :view

  def render("index.json", %{categories: categories}) do
    render_many(categories, ListsWeb.CategoryView, "category.json")
  end

  def render("show.json", %{category: category}) do
    render_one(category, ListsWeb.CategoryView, "category.json")
  end

  def render("category.json", %{category: category}) do
    %{
      id: category.id,
      name: category.name,
      description: category.description,
      lists: render_many(category.lists, ListsWeb.ListView, "list_short.json")
    }
  end

  def render("category_assoc_many.json", %{categories: categories}) do
    render_many(categories, ListsWeb.CategoryView, "category_assoc.json")
  end

  def render("category_assoc.json", %{category: category}) do
    %{id: category.id, name: category.name, description: category.description}
  end

  def render("one_category.json", %{category: category}) do
    # This should be use when creating a new category
    %{
      id: category.id,
      name: category.name,
      description: category.description,
      lists: []
    }
  end

  # def render("category_with_list", %{category: category}) do
  #   %{data: render_all(category, ListsWeb.CategoryView, "categorytotal")}
  # end

  def render("404.json", %{error: error}) do
    %{
      errors: %{
        message: error
      }
    }
  end

  # def render_all("categorytotal.json", %{category: category}) do
  #   %{
  #     id: category.id,
  #     name: category.name,
  #     description: category.description,
  #     numberList: category.numberList
  #   }
  # end
end
