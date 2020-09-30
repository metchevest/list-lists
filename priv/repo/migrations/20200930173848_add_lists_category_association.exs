defmodule Lists.Repo.Migrations.AddListsCategoryAssociation do
  use Ecto.Migration

  def change do

    create table(:categories_lists) do
      add :category_id, references(:categories)
      add :list_id, references(:lists)

      timestamps()
    end

    create unique_index(:categories_lists, [:category_id, :list_id])

  end
end
