defmodule Lists.AreListTest do
  use Lists.DataCase

  alias Lists.AreList

  describe "islits" do
    alias Lists.AreList.IsList

    @valid_attrs %{active: true, date_init: ~D[2010-04-17], name: "some name"}
    @update_attrs %{active: false, date_init: ~D[2011-05-18], name: "some updated name"}
    @invalid_attrs %{active: nil, date_init: nil, name: nil}

    def is_list_fixture(attrs \\ %{}) do
      {:ok, is_list} =
        attrs
        |> Enum.into(@valid_attrs)
        |> AreList.create_is_list()

      is_list
    end

    test "list_islits/0 returns all islits" do
      is_list = is_list_fixture()
      assert AreList.list_islits() == [is_list]
    end

    test "get_is_list!/1 returns the is_list with given id" do
      is_list = is_list_fixture()
      assert AreList.get_is_list!(is_list.id) == is_list
    end

    test "create_is_list/1 with valid data creates a is_list" do
      assert {:ok, %IsList{} = is_list} = AreList.create_is_list(@valid_attrs)
      assert is_list.active == true
      assert is_list.date_init == ~D[2010-04-17]
      assert is_list.name == "some name"
    end

    test "create_is_list/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = AreList.create_is_list(@invalid_attrs)
    end

    test "update_is_list/2 with valid data updates the is_list" do
      is_list = is_list_fixture()
      assert {:ok, %IsList{} = is_list} = AreList.update_is_list(is_list, @update_attrs)
      assert is_list.active == false
      assert is_list.date_init == ~D[2011-05-18]
      assert is_list.name == "some updated name"
    end

    test "update_is_list/2 with invalid data returns error changeset" do
      is_list = is_list_fixture()
      assert {:error, %Ecto.Changeset{}} = AreList.update_is_list(is_list, @invalid_attrs)
      assert is_list == AreList.get_is_list!(is_list.id)
    end

    test "delete_is_list/1 deletes the is_list" do
      is_list = is_list_fixture()
      assert {:ok, %IsList{}} = AreList.delete_is_list(is_list)
      assert_raise Ecto.NoResultsError, fn -> AreList.get_is_list!(is_list.id) end
    end

    test "change_is_list/1 returns a is_list changeset" do
      is_list = is_list_fixture()
      assert %Ecto.Changeset{} = AreList.change_is_list(is_list)
    end
  end
end
