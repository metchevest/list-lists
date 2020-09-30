defmodule ListsWeb.IsListControllerTest do
  use ListsWeb.ConnCase

  alias Lists.AreList
  alias Lists.AreList.IsList

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

  def fixture(:is_list) do
    {:ok, is_list} = AreList.create_is_list(@create_attrs)
    is_list
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all islits", %{conn: conn} do
      conn = get(conn, Routes.is_list_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create is_list" do
    test "renders is_list when data is valid", %{conn: conn} do
      conn = post(conn, Routes.is_list_path(conn, :create), is_list: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.is_list_path(conn, :show, id))

      assert %{
               "id" => id,
               "active" => true,
               "date_init" => "2010-04-17",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.is_list_path(conn, :create), is_list: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update is_list" do
    setup [:create_is_list]

    test "renders is_list when data is valid", %{conn: conn, is_list: %IsList{id: id} = is_list} do
      conn = put(conn, Routes.is_list_path(conn, :update, is_list), is_list: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.is_list_path(conn, :show, id))

      assert %{
               "id" => id,
               "active" => false,
               "date_init" => "2011-05-18",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, is_list: is_list} do
      conn = put(conn, Routes.is_list_path(conn, :update, is_list), is_list: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete is_list" do
    setup [:create_is_list]

    test "deletes chosen is_list", %{conn: conn, is_list: is_list} do
      conn = delete(conn, Routes.is_list_path(conn, :delete, is_list))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.is_list_path(conn, :show, is_list))
      end
    end
  end

  defp create_is_list(_) do
    is_list = fixture(:is_list)
    %{is_list: is_list}
  end
end
