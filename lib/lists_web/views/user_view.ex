defmodule ListsWeb.UserView do
  use ListsWeb, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, ListsWeb.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, ListsWeb.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{  name: user.name,
        id: user.id,
        google_id: user.google_id,
        lists: render_many(user.lists, ListsWeb.ListView, "list.json")
      }
  end

  def render("justuser.json", %{user: user}) do
    %{
      google_id: user.google_id
    }
  end

end
