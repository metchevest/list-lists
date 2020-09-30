defmodule Lists.AreList do
  @moduledoc """
  The AreList context.
  """

  import Ecto.Query, warn: false
  alias Lists.Repo

  alias Lists.AreList.IsList

  @doc """
  Returns the list of islits.

  ## Examples

      iex> list_islits()
      [%IsList{}, ...]

  """
  def list_islits do
    Repo.all(IsList)
  end

  @doc """
  Gets a single is_list.

  Raises `Ecto.NoResultsError` if the Is list does not exist.

  ## Examples

      iex> get_is_list!(123)
      %IsList{}

      iex> get_is_list!(456)
      ** (Ecto.NoResultsError)

  """
  def get_is_list!(id), do: Repo.get!(IsList, id)

  @doc """
  Creates a is_list.

  ## Examples

      iex> create_is_list(%{field: value})
      {:ok, %IsList{}}

      iex> create_is_list(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_is_list(attrs \\ %{}) do
    %IsList{}
    |> IsList.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a is_list.

  ## Examples

      iex> update_is_list(is_list, %{field: new_value})
      {:ok, %IsList{}}

      iex> update_is_list(is_list, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_is_list(%IsList{} = is_list, attrs) do
    is_list
    |> IsList.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a is_list.

  ## Examples

      iex> delete_is_list(is_list)
      {:ok, %IsList{}}

      iex> delete_is_list(is_list)
      {:error, %Ecto.Changeset{}}

  """
  def delete_is_list(%IsList{} = is_list) do
    Repo.delete(is_list)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking is_list changes.

  ## Examples

      iex> change_is_list(is_list)
      %Ecto.Changeset{data: %IsList{}}

  """
  def change_is_list(%IsList{} = is_list, attrs \\ %{}) do
    IsList.changeset(is_list, attrs)
  end
end
