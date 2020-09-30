defmodule ListsWeb.ItemView do
  use ListsWeb, :view
  alias ListsWeb.ItemView

  def render("index.json", %{items: items}) do
    %{data: render_many(items, ItemView, "item.json")}
  end

  def render("show.json", %{item: item}) do
    %{data: render_one(item, ItemView, "item.json")}
  end

  def render("item.json", %{item: item}) do
    %{id: item.id,
      mark: item.mark,
      text: item.text}
  end
end
