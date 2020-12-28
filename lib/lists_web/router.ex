defmodule ListsWeb.Router do
  use ListsWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ListsWeb do
    pipe_through :browser

    resources "/users", UserController
    resources "/lists", ListController
    resources "/items", ItemController
    resources "/categories", CategoryController
  end

  scope "/api", ListsWeb do
    pipe_through :api

    get "/user/:google_user_id", UserController, :login_user
    get "/user/:google_user_id/lists", ListController, :get_user_lists
    get "/user/:google_user_id/list/:list_id", ListController, :get_user_list
    get "/user/:google_user_id/list/:list_id/items", ItemController, :get_items
    get "/user/:google_user_id/categories", CategoryController, :get_user_categories

    post "/user/:google_user_id/list", ListController, :new_list
    post "/user/:google_user_id/list/:list_id/item", ItemController, :new_item
    post "/user/:google_user_id/category", CategoryController, :new_user_category
    post "/user/:google_user_id/list/:list_id/category", ListController, :update_categories

    delete "/user/:google_user_id/list/:list_id", ListController, :delete_list
    delete "/user/:google_user_id/list/:list_id/item/:item_id", ItemController, :delete_item

    patch "/user/:google_user_id/list/:list_id", ListController, :edit_list
    patch "/user/:google_user_id/list/:list_id/item/:item_id", ItemController, :edit_item
  end

  # Other scopes may use custom stacks.
  # scope "/api", ListsWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: ListsWeb.Telemetry
    end
  end
end
