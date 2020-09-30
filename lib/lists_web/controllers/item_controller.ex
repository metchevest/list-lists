defmodule ListsWeb.ItemController do
  use ListsWeb, :controller

  alias Lists.Items
  alias Lists.Items.Item

  action_fallback ListsWeb.FallbackController

end
