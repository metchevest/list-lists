defmodule ListsWeb.IsListView do
  use ListsWeb, :view
  alias ListsWeb.IsListView

  def render("index.json", %{islits: islits}) do
    %{data: render_many(islits, IsListView, "is_list.json")}
  end

  def render("show.json", %{is_list: is_list}) do
    %{data: render_one(is_list, IsListView, "is_list.json")}
  end

  def render("is_list.json", %{is_list: is_list}) do
    %{id: is_list.id,
      name: is_list.name,
      date_init: is_list.date_init,
      active: is_list.active}
  end
end
