import fp from "fastify-plugin"
import knex from "knex"

function knexPlugin(server, _options, next) {
  const knexConnection = knex({
    client: "pg",
    connection: process.env.DATABASE_URL,
  })

  server.decorate("knex", knexConnection)

  server.addHook("onClose", (instance, done) => {
    if (instance.knex === knexConnection) {
      instance.knex.destroy()
      delete instance.knex
    }
    done()
  })

  next()
}

export default fp(knexPlugin)
