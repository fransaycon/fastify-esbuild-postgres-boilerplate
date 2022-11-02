import { Knex } from "knex"
import UserModel from "./items-model"
import connectTestDatabase from "@/test-utils/connect-test-database"
import { Item, UnsavedItem } from "./items"
import disconnectTestDatabase from "@/test-utils/disconnect-test-database"

describe("ItemModel", () => {
  let knex: Knex

  beforeAll(() => {
    knex = connectTestDatabase()
  })

  afterAll(async () => {
    await disconnectTestDatabase(knex)
  })

  it("should create without any problems and return id of creation", async () => {
    const unsavedItem: UnsavedItem = {
      name: "fake name",
      description: "fake description",
    }
    const itemId = await UserModel.create(knex, unsavedItem)

    const result = await knex.select("*").from<Item>("items")
    expect(result[0]).toStrictEqual({ id: itemId, ...unsavedItem })
  })
})
