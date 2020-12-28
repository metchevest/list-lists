defmodule Lists.Array do
  @moduledoc """
  The Array context.
  """

  import Ecto.Query, warn: true
  alias Lists.Repo

  alias Lists.Array.List
  alias Lists.Accounts
  alias Lists.Accounts.User
  alias Lists.Categories

  @doc """
  Returns the list of lists.

  ## Examples

      iex> list_lists()
      [%List{}, ...]

  """
  def list_lists do
    List
    |> Repo.all()
    |> Repo.preload([:items, :categories, :user])
  end

  @doc """
  Gets a single list.

  Raises `Ecto.NoResultsError` if the List does not exist.

  ## Examples

      iex> get_list!(123)
      %List{}

      iex> get_list!(456)
      ** (Ecto.NoResultsError)

  """
  def get_list!(id), do: Repo.get!(List, id)

  def create_list_by_google_id(%{
        "google_user_id" => google_user_id,
        "name" => name,
        "description" => description
      }) do
    google_user_id
    |> Accounts.get_user_by_google_id()
    |> Ecto.build_assoc(:lists, %{name: name, description: description})
    |> Repo.insert!()
    |> Repo.preload([:items, :categories])
  end

  @doc """
  Creates a list.

  ## Examples

      iex> create_list(%{field: value})
      {:ok, %List{}}

      iex> create_list(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_list(attrs \\ %{}) do
    %List{}
    |> List.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a list.

  ## Examples

      iex> update_list(list, %{field: new_value})
      {:ok, %List{}}

      iex> update_list(list, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_list(%List{} = list, attrs) do
    list
    |> List.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a list.

  ## Examples

      iex> delete_list(list)
      {:ok, %List{}}

      iex> delete_list(list)
      {:error, %Ecto.Changeset{}}

  """
  def delete_list(%List{} = list) do
    Repo.delete(list)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking list changes.

  ## Examples

      iex> change_list(list)
      %Ecto.Changeset{data: %List{}}

  """
  def change_list(%List{} = list, attrs \\ %{}) do
    List.changeset(list, attrs)
  end

  def addItem(list, item) do
    (list.items ++ [item]) |> Enum.map(&Ecto.Changeset.change/1)
  end

  @doc """
  Add an item to a list
  """

  def add_item_to_list(item, list) do
    list
    |> Repo.preload(:items)
    |> Ecto.Changeset.change()
    |> Ecto.Changeset.put_assoc(:items, addItem(list, item))
    |> Repo.update!()

    # list_loaded = Repo.preload(list, :items)

    # items_change = (list_loaded.items ++ [item]) |> Enum.map(&Ecto.Changeset.change/1)

    # list_loaded
    # |> Ecto.Changeset.change()
    # |> Ecto.Changeset.put_assoc(:items, items_change)
    # |> Repo.update!()
  end

  def add_category_to_list(category, list) do
    list = Repo.preload(list, [:categories, :items, :users])

    # TODO---> TEST THIS FUNCTION
    category
    |> Repo.preload(:lists)
    # <- the category as param ???
    |> Ecto.Changeset.change(category)
    |> Ecto.Changeset.put_assoc(:lists, [list])
    |> Repo.update!()

    # category = Repo.preload(category, :lists)
    # list = Repo.preload(list, [:categories, :items, :users])

    # category_changeset = Ecto.Changeset.change(category)

    # category_list_changeset = category_changeset |> Ecto.Changeset.put_assoc(:lists, [list])

    # Repo.update!(category_list_changeset)
    ###########################################
    # list_loaded = Repo.preload(list, :categories)

    # categories_change = list_loaded.categories ++ [category] |> Enum.map(&Ecto.Changeset.change/1)

    # list_loaded
    #   |> Ecto.Changeset.change()
    #   |> Ecto.Changeset.put_assoc(:categories, categories_change)
    #   |> Repo.update!()
  end

  @doc """
   Return a List or error

   If exits returns the list of the user identified with the id and
   the list tieh the id -> list_id

  """
  def get_user_list(google_id, list_id) do
    query =
      from l in List,
        inner_join: u in User,
        where: l.id == ^list_id and u.google_id == ^google_id

    try do
      query
      |> Repo.one()
      |> Repo.preload([:items, :categories])
    rescue
      _e in MultipleResultsError -> nil
    end
  end

  @doc """
  Get all the lists of the user identified by the google id.
  """

  def get_user_lists_by_google_id(google_id) do
    query =
      from l in List,
        join: u in User,
        on: l.user_id == u.id,
        where: u.google_id == ^google_id

    query
    |> Repo.all()
    |> Repo.preload([:items, :categories])
  end

  def delete_user_list(google_id, list_id) do
    google_id
    |> get_user_list(parseId(list_id))
    |> delete_list()
  end

  def edit_list(%{
        "description" => description,
        "google_user_id" => google_user_id,
        "list_id" => list_id,
        "name" => name
      }) do
    google_user_id
    |> get_user_list(parseId(list_id))
    |> update_list(%{"description" => description, "name" => name})
    |> elem(1)
  end

  def edit_list(%{"list_id" => list_id, "google_user_id" => google_user_id}) do
    # this means the user want to toggle the state of the list
    # This could be done by a special route, but this way works fine.

    google_user_id
    |> get_user_list(parseId(list_id))
    |> toggleState()
    |> elem(1)
  end

  def toggleState(list) do
    list
    |> update_list(%{"active" => !list.active})
  end

  def parseId(text_id) do
    Integer.parse(text_id)
    |> elem(0)
  end

  def update_list_categories(%{
        "categories" => categories,
        "google_user_id" => google_id,
        "list_id" => list_id
      }) do
    categories_loaded =
      categories
      |> Enum.map(fn x -> Categories.get_category(x) end)
      |> Enum.map(&Ecto.Changeset.change/1)

    get_user_list(google_id, list_id)
    |> Ecto.Changeset.change()
    |> IO.inspect()
    |> Ecto.Changeset.put_assoc(:categories, categories_loaded)
    |> Repo.update!()

    # Array.add_category_to_list()
    # IO.puts("en el context categories")
    # IO.inspect(categories)
    # IO.inspect(list)
  end
end
