defmodule ListsWeb.ListView do
  use ListsWeb, :view
  alias ListsWeb.ListView

  def render("index.json", %{lists: lists}) do
    %{data: render_many(lists, ListView, "list.json")}
  end

  def render("show.json", %{list: list}) do
    %{data: render_one(list, ListView, "list.json")}
  end

  def render("list.json", %{list: list}) do
    %{id: list.id,
      name: list.name,
      date_init: list.date_init,
      active: list.active}
  end
end
