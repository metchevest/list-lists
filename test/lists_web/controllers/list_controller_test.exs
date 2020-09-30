defmodule ListsWeb.ListControllerTest do
  use ListsWeb.ConnCase

  alias Lists.Array
  alias Lists.Array.List

  @create_attrs %{
    active: true,
    date_init: ~D[2010-04-17],
    name: "some name"
  }
  @update_attrs %{
    active: false,
    date_init: ~D[2011-05-18],
    name: "some updated name"
  }
  @invalid_attrs %{active: nil, date_init: nil, name: nil}

  def fixture(:list) do
    {:ok, list} = Array.create_list(@create_attrs)
    list
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all lists", %{conn: conn} do
      conn = get(conn, Routes.list_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create list" do
    test "renders list when data is valid", %{conn: conn} do
      conn = post(conn, Routes.list_path(conn, :create), list: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.list_path(conn, :show, id))

      assert %{
               "id" => id,
               "active" => true,
               "date_init" => "2010-04-17",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.list_path(conn, :create), list: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update list" do
    setup [:create_list]

    test "renders list when data is valid", %{conn: conn, list: %List{id: id} = list} do
      conn = put(conn, Routes.list_path(conn, :update, list), list: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.list_path(conn, :show, id))

      assert %{
               "id" => id,
               "active" => false,
               "date_init" => "2011-05-18",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, list: list} do
      conn = put(conn, Routes.list_path(conn, :update, list), list: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete list" do
    setup [:create_list]

    test "deletes chosen list", %{conn: conn, list: list} do
      conn = delete(conn, Routes.list_path(conn, :delete, list))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.list_path(conn, :show, list))
      end
    end
  end

  defp create_list(_) do
    list = fixture(:list)
    %{list: list}
  end
end
