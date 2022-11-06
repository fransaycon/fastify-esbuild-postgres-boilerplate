import { Knex } from "knex"
import { UnsavedItem } from "./items"
import UserModel from "./items-model"

export async function create(knex: Knex, data: UnsavedItem): Promise<number> {
  const itemId = await UserModel.create(knex, data)
  return itemId
}

const UserController = {
  create,
}

export default UserController
