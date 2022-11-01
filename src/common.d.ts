import { FastifyInstance } from "fastify"
import { Knex } from "knex"

interface FastifyWithKnex extends FastifyInstance {
  knex: Knex
}
