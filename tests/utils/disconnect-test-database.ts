import { Knex } from "knex"

async function disconnectTestDatabase(knex: Knex): Promise<void> {
  await knex.destroy()
}

export default disconnectTestDatabase
