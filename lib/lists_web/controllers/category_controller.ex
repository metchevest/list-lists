defmodule ListsWeb.CategoryController do
  use ListsWeb, :controller

  alias Lists.Categories
  alias Lists.Categories.Category

  action_fallback ListsWeb.FallbackController

end
