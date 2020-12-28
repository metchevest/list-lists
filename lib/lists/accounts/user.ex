defmodule Lists.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :google_id, :string

    has_many :lists, Lists.Array.List
    has_many :categories, Lists.Categories.Category

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:google_id])
    |> validate_required([:google_id])
  end
end
