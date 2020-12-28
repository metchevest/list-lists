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

# alias Lists.Repo

# alias Lists.Accounts
# alias Lists.Accounts.User
# alias Lists.Array
# alias Lists.Array.List
# alias Lists.Items.Item
# alias Lists.Categories
# alias Lists.Categories.Category

# user1= %User{name: "Dave"} |> Repo.insert!()

# user2= %User{name: "John"} |> Repo.insert!()

# user3= %User{name: "Jane"} |> Repo.insert!()

# %User{name: "Ian"} |> Repo.insert!()

# %User{name: "Mark"} |> Repo.insert!()

# %User{name: "Johnny"} |> Repo.insert!()


# list1= %List{name: "Work", date_init: ~D[2020-02-08], active: true} |> Repo.insert!()

# list2= %List{name: "Shop list", date_init: ~D[2020-12-08], active: true} |> Repo.insert!()

# list3= %List{name: "Friends", date_init: ~D[2020-09-10], active: false} |> Repo.insert!()

# list4= %List{name: "ALso", date_init: ~D[2020-03-10], active: true} |> Repo.insert!()

# Accounts.add_list_to_user(user1, list1)

# Accounts.add_list_to_user(user2, list2)

# Accounts.add_list_to_user(user3, list3)

# Accounts.add_list_to_user(user3, list4)


# item1 = %Item{mark: true, text: "Call Saul"} |> Repo.insert!()

# item2 = %Item{mark: true, text: "Call Other"} |> Repo.insert!()

# item3 = %Item{mark: true, text: "Call Saul"} |> Repo.insert!()

# item4 = %Item{mark: true, text: "Call Saul"} |> Repo.insert!()

# Array.add_item_to_list(item1, list1)

# Array.add_item_to_list(item2, list2)

# Array.add_item_to_list(item3, list3)

# Array.add_item_to_list(item4, list1)

# cat1 = %Category{name: "To-do", description: "things to do"} |> Repo.insert!
# cat2 = %Category{name: "Not-To-do", description: "things not to do"} |> Repo.insert!
# cat3 = %Category{name: "Girlfriens", description: "I did"} |> Repo.insert!
# cat4 = %Category{name: "Shop", description: "things to shop"} |> Repo.insert!

# Array.add_category_to_list(cat1, list1)

# Array.add_category_to_list(cat2, list1)

# Array.add_category_to_list(cat3, list2)

# Array.add_category_to_list(cat4, list4)
