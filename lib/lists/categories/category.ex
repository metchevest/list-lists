defmodule Lists.Categories.Category do
  use Ecto.Schema
  import Ecto.Changeset

  schema "categories" do
    field :description, :string
    field :name, :string

    many_to_many :lists, Lists.Array.List, join_through: "categories_lists", on_replace: :delete
    belongs_to :user, Lists.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(category, attrs) do
    category
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
