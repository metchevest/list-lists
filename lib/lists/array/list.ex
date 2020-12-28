defmodule Lists.Array.List do
  use Ecto.Schema
  import Ecto.Changeset

  schema "lists" do
    field :active, :boolean, default: true
    field :date_init, :date
    field :name, :string
    field :description, :string

    belongs_to :user, Lists.Accounts.User
    has_many :items, Lists.Items.Item, on_replace: :delete, on_delete: :delete_all

    many_to_many :categories, Lists.Categories.Category,
      join_through: "categories_lists",
      on_replace: :delete,
      on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(list, attrs) do
    list
    |> cast(attrs, [:name, :description, :active])
    |> validate_required([:name, :description])
  end
end
