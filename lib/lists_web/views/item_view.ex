defmodule ListsWeb.ItemView do
  use ListsWeb, :view

  def render("index.json", %{list: list}) do
    %{data: %{list_id: list.id, items: render_many(list.items, ListsWeb.ItemView, "item.json")}}
  end

  def render("show.json", %{item: item}) do
    %{data: render_one(item, ListsWeb.ItemView, "item.json")}
  end

  def render("item.json", %{item: item}) do
    %{id: item.id, mark: item.mark, text: item.text}
  end

  def render("one_item.json", %{item: item}) do
    %{
      id: item.id,
      mark: item.mark,
      text: item.text
    }
  end

  def render("404.json", %{error: error}) do
    %{
      errors: %{
        message: error
      }
    }
  end

  def render("delete.json", %{item_id: item_id}) do
    %{
      item_id: item_id
    }
  end
end
