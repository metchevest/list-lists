defmodule Lists.Categories do
  @moduledoc """
  The Categories context.
  """

  import Ecto.Query, warn: false

  alias Lists.Repo

  alias Lists.Categories.Category
  alias Lists.Accounts.User
  alias Lists.Array.List
  alias Lists.Array

  @doc """
  Returns the list of categories.

  ## Examples

      iex> list_categories()
      [%Category{}, ...]

  """
  def list_categories do
    Category
    |> Repo.all()
    |> Repo.preload(:lists)
  end

  defp get_category!(id), do: Repo.get!(Category, id)

  def get_category(id), do: Repo.get(Category, id)

  @doc """
  Creates a category.

  ## Examples

      iex> create_category(%{field: value})
      {:ok, %Category{}}

      iex> create_category(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_category(attrs \\ %{}) do
    %Category{}
    |> Category.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a category.

  ## Examples

      iex> update_category(category, %{field: new_value})
      {:ok, %Category{}}

      iex> update_category(category, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_category(%Category{} = category, attrs) do
    category
    |> Category.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a category.

  ## Examples

      iex> delete_category(category)
      {:ok, %Category{}}

      iex> delete_category(category)
      {:error, %Ecto.Changeset{}}

  """
  def delete_category(%Category{} = category) do
    category
    |> Repo.preload(:lists)
    |> Repo.delete()
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking category changes.

  ## Examples

      iex> change_category(category)
      %Ecto.Changeset{data: %Category{}}

  """
  def change_category(%Category{} = category, attrs \\ %{}) do
    Category.changeset(category, attrs)
  end

  # Repo.all(from c in Category, inner_join: l in List, group_by: [c.id, l.id])

  # testear cuando tenga mas info...
  # query = from c in Category,
  # inner_join: u in User,
  # inner_join: l in List,
  # where: u.google_id == ^google_user_id,
  # group_by: c.name,
  # select: [c.name, count(l)]

  def list_user_categories(%{"google_user_id" => google_user_id}) do
    query =
      from c in Category,
        inner_join: u in User,
        inner_join: l in List,
        where: u.google_id == ^google_user_id

    query
    |> Repo.all()
    |> Repo.preload([:user, :lists])
  end

  def new_user_category(%{
        "google_user_id" => google_id,
        "name" => name,
        "description" => description
      }) do
    query = from u in User, where: u.google_id == ^google_id

    query
    |> Repo.one()
    |> Repo.preload(:categories)
    |> create_assoc_category(name, description)
  end

  def create_assoc_category(nil, _name, _description) do
    nil
  end

  def create_assoc_category(user, name, description) do
    user
    |> Ecto.build_assoc(:categories, %{name: name, description: description})
    |> Repo.insert!()
  end
end
