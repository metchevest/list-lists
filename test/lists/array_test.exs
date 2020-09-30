defmodule Lists.ArrayTest do
  use Lists.DataCase

  alias Lists.Array

  describe "lists" do
    alias Lists.Array.List

    @valid_attrs %{active: true, date_init: ~D[2010-04-17], name: "some name"}
    @update_attrs %{active: false, date_init: ~D[2011-05-18], name: "some updated name"}
    @invalid_attrs %{active: nil, date_init: nil, name: nil}

    def list_fixture(attrs \\ %{}) do
      {:ok, list} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Array.create_list()

      list
    end

    test "list_lists/0 returns all lists" do
      list = list_fixture()
      assert Array.list_lists() == [list]
    end

    test "get_list!/1 returns the list with given id" do
      list = list_fixture()
      assert Array.get_list!(list.id) == list
    end

    test "create_list/1 with valid data creates a list" do
      assert {:ok, %List{} = list} = Array.create_list(@valid_attrs)
      assert list.active == true
      assert list.date_init == ~D[2010-04-17]
      assert list.name == "some name"
    end

    test "create_list/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Array.create_list(@invalid_attrs)
    end

    test "update_list/2 with valid data updates the list" do
      list = list_fixture()
      assert {:ok, %List{} = list} = Array.update_list(list, @update_attrs)
      assert list.active == false
      assert list.date_init == ~D[2011-05-18]
      assert list.name == "some updated name"
    end

    test "update_list/2 with invalid data returns error changeset" do
      list = list_fixture()
      assert {:error, %Ecto.Changeset{}} = Array.update_list(list, @invalid_attrs)
      assert list == Array.get_list!(list.id)
    end

    test "delete_list/1 deletes the list" do
      list = list_fixture()
      assert {:ok, %List{}} = Array.delete_list(list)
      assert_raise Ecto.NoResultsError, fn -> Array.get_list!(list.id) end
    end

    test "change_list/1 returns a list changeset" do
      list = list_fixture()
      assert %Ecto.Changeset{} = Array.change_list(list)
    end
  end
end
