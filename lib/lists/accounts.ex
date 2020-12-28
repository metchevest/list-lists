defmodule Lists.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Lists.Repo

  alias Lists.Accounts.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    User
    |> Repo.all()
    |> Repo.preload([:lists, :categories])
    |> Repo.preload(lists: :items)
  end

  def user_logged_by_google_id(google_id) do
    IO.puts "Estoy en user_logged.."
    IO.inspect(google_id)

    query = from u in User,
            where: u.google_id == ^google_id

    case Repo.one(query) do
      nil -> new_user(google_id)
      user -> user
    end

  end

  def new_user(google_id) do
    IO.puts "Estyo en new_user"
    IO.inspect(google_id)
    case create_user(%{"google_id" => google_id}) do
      {:ok, user} -> user
      {:error, message } -> message
    end
  end



   @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  @doc """
    Add a list to a user
  """

  def add_list_to_user(user, list) do
    IO.inspect(user)
    user = Repo.preload(user, :lists)
    list_with_change = user.lists ++ [list] |> Enum.map(&Ecto.Changeset.change/1)

    user
    |> Ecto.Changeset.change
    |> Ecto.Changeset.put_assoc(:lists, list_with_change)
    |> Repo.update!

 end

 def add_list_to_user_by_google_id(user_google_id, list) do
  case Repo.one(from u in User, where: u.google_id == ^user_google_id) do
      nil -> nil
      user -> add_list_to_user(user, list)
  end
 end

 def get_user_by_google_id(id) do
    Repo.one(from u in User, where: u.google_id == ^id)
 end

end
