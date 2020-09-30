defmodule ListsWeb.ListController do
  use ListsWeb, :controller

  alias Lists.Array
  alias Lists.Array.List

  action_fallback ListsWeb.FallbackController


end
