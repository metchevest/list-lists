# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Lists.Repo.insert!(%Lists.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Lists.Repo

alias Lists.Accounts.User

%User{name: "Dave"} |> Repo.insert!()

%User{name: "John"} |> Repo.insert!()

%User{name: "Jane"} |> Repo.insert!()

%User{name: "Carol"} |> Repo.insert!()

%User{name: "Steven"} |> Repo.insert!()
