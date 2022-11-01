import { Knex } from "knex"
import { UnsavedItem } from "./items"
import { UnsavedItemValidationError } from "./items.error"
import UserModel from "./items.model"
import { unsavedItemSchema } from "./items.schema"

export async function create(knex: Knex, data: UnsavedItem): Promise<number> {
  const { value, error } = unsavedItemSchema.validate(data)
  if (error) {
    throw new UnsavedItemValidationError(error)
  }
  const itemId = await UserModel.create(knex, value)
  return itemId
}

const UserController = {
  create,
}

export default UserController
