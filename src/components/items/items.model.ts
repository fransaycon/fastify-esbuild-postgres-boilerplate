import { Knex } from "knex"
import { Item, UnsavedItem } from "./items"

export async function create(knex: Knex, data: UnsavedItem): Promise<number> {
  const itemId = await knex<Item>("items").insert(data).returning<number>("id")
  return itemId
}

const UserModel = {
  create,
}

export default UserModel
