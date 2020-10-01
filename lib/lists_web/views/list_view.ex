defmodule ListsWeb.ListView do
  use ListsWeb, :view

  def render("index.json", %{lists: lists}) do
    %{data: render_many(lists, ListsWeb.ListView, "list.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, ListsWeb.ListView, "list.json")}
  end

  def render("list.json", %{list: list}) do
    %{  id: list.id,
        name: list.name,
        active: list.active,
        date_init: list.date_init,
        items: render_many(list.items, ListsWeb.ItemView, "item.json")
      }
  end

end
