import knex, { Knex } from "knex"
import dotenv from "dotenv"

dotenv.config()

function connectTestDatabase(): Knex {
  const knexInstance = knex({
    client: "pg",
    connection: process.env.TEST_DATABASE_URL,
  })

  return knexInstance
}

export default connectTestDatabase
