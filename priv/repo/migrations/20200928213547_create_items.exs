defmodule Lists.Repo.Migrations.CreateItems do
  use Ecto.Migration

  def change do
    create table(:items) do
      add :mark, :boolean, default: false, null: false
      add :text, :string

      timestamps()
    end

  end
end
