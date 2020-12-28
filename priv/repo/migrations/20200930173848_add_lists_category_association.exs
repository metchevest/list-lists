defmodule Lists.Repo.Migrations.AddListsCategoryAssociation do
  use Ecto.Migration

  def change do

    create table(:categories_lists) do
      add :category_id, references(:categories)
      add :list_id, references(:lists)

    end

    create unique_index(:categories_lists, [:category_id, :list_id])

    alter table(:lists) do
      add :user_id, references(:users)
    end

    alter table(:items) do
      add :list_id, references(:lists)
    end

    alter table(:categories) do
      add :user_id, references(:users)
    end

  end
end
