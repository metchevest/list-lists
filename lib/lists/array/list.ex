defmodule Lists.Array.List do
  use Ecto.Schema
  import Ecto.Changeset

  schema "lists" do
    field :active, :boolean, default: false
    field :date_init, :date
    field :name, :string

    belongs_to :user, Lists.Accounts.User
    has_many :items, Lists.Items.Item

    many_to_many :categories, Lists.Categories.Category, join_through: "categories_lists", on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(list, attrs) do
    list
    |> cast(attrs, [:name, :date_init, :active])
    |> validate_required([:name, :date_init, :active])
  end
end
