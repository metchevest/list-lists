defmodule Lists.Repo.Migrations.CreateLists do
  use Ecto.Migration

  def change do
    create table(:lists) do
      add :name, :string
      add :date_init, :date
      add :active, :boolean, default: true, null: false
      add :description, :string

      timestamps()
    end

  end
end
