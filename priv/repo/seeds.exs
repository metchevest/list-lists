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

alias Lists.Accounts
alias Lists.Accounts.User
alias Lists.Array.List

user1= %User{name: "Dave"} |> Repo.insert!()

user2= %User{name: "John"} |> Repo.insert!()

user3= %User{name: "Jane"} |> Repo.insert!()

%User{name: "Ian"} |> Repo.insert!()

%User{name: "Mark"} |> Repo.insert!()

%User{name: "Johnny"} |> Repo.insert!()


list1= %List{name: "Work", date_init: ~D[2020-02-08], active: true} |> Repo.insert!()

list2= %List{name: "Shop list", date_init: ~D[2020-12-08], active: true} |> Repo.insert!()

list3= %List{name: "Friends", date_init: ~D[2020-09-10], active: false} |> Repo.insert!()

Accounts.add_list_to_user(user1, list1)

Accounts.add_list_to_user(user2, list2)

Accounts.add_list_to_user(user3, list3)
