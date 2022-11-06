import knex, { Knex } from "knex"

function connectTestDatabase(): Knex {
  const knexInstance = knex({
    client: "pg",
    connection: process.env.TEST_DATABASE_URL,
  })

  return knexInstance
}

export default connectTestDatabase
