defmodule Lists.Items.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field :mark, :boolean, default: false
    field :text, :string

    belongs_to :list, Lists.Array.List

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:mark, :text])
    |> validate_required([:mark, :text])
  end
end
