defmodule Lists.Items do
  @moduledoc """
  The Items context.
  """

  import Ecto.Query, warn: false
  alias Lists.Repo
  alias Lists.Array.List
  alias Lists.Items.Item
  alias Lists.Accounts.User

  @doc """
  Returns the list of items.

  ## Examples

      iex> list_items()
      [%Item{}, ...]

  """
  def list_items do
    Repo.all(Item)
  end

  @doc """
  Gets a single item.

  Raises `Ecto.NoResultsError` if the Item does not exist.

  ## Examples

      iex> get_item!(123)
      %Item{}

      iex> get_item!(456)
      ** (Ecto.NoResultsError)

  """
  defp get_item!(id), do: Repo.get!(Item, id)

  def get_item(id), do: Repo.get(Item, id)

  @doc """
  Creates a item.

  ## Examples

      iex> create_item(%{field: value})
      {:ok, %Item{}}

      iex> create_item(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_item(attrs \\ %{}) do
    %Item{}
    |> Item.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a item.

  ## Examples

      iex> update_item(item, %{field: new_value})
      {:ok, %Item{}}

      iex> update_item(item, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_item(%Item{} = item, attrs) do
    item
    |> Item.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a item.

  ## Examples

      iex> delete_item(item)
      {:ok, %Item{}}

      iex> delete_item(item)
      {:error, %Ecto.Changeset{}}

  """
  def delete_item(%Item{} = item) do
    Repo.delete(item)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking item changes.

  ## Examples

      iex> change_item(item)
      %Ecto.Changeset{data: %Item{}}

  """
  def change_item(%Item{} = item, attrs \\ %{}) do
    Item.changeset(item, attrs)
  end

  # See if the input name has to be harcoded

  def new_item(%{"google_user_id" => google_user_id, "list_id" => list_id, "text" => text}) do
    query =
      from l in List,
        inner_join: u in User,
        where: l.id == ^list_id and u.google_id == ^google_user_id

    case Repo.one(query) do
      nil ->
        nil

      list ->
        Ecto.build_assoc(list, :items, %{text: text}) |> Repo.insert!()
    end
  end

  def delete_user_item(%{
        "google_user_id" => google_id,
        "item_id" => item_id,
        "list_id" => list_id
      }) do
    get_item_from(google_id, list_id, item_id)
    |> Repo.delete()
    |> elemOne
  end

  def edit_item(%{
        "google_user_id" => google_id,
        "item_id" => item_id,
        "list_id" => list_id,
        "text" => text
      }) do
    get_item_from(google_id, list_id, item_id)
    |> update_item(%{"text" => text})
    |> elemOne
  end

  def elemOne({:ok, elem}) do
    elem
  end

  def elemOne({:error, _changeset}) do
    nil
  end

  def get_item_from(google_id, list_id, item_id) do
    query =
      from i in Item,
        inner_join: u in User,
        inner_join: l in List,
        where: u.google_id == ^google_id and l.id == ^list_id and i.id == ^item_id

    query
    |> Repo.one()
    |> Repo.preload(:list)
  end
end
