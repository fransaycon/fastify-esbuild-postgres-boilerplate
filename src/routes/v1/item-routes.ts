import { UnsavedItem } from "@/components/items/items"
import UserController from "@/components/items/items-controllers"
import { FastifyWithKnex } from "../../common"
import { FastifyRequest } from "fastify"

type ItemsCreateRequest = FastifyRequest<{
  Body: UnsavedItem
}>

export default function itemRoutes(server: FastifyWithKnex, options, next) {
  server.post(
    "/items",
    {
      schema: {
        description:
          "Create a test item with name and description without restrictions",
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              allOf: [
                { transform: ["trim"] },
                { minLength: 5 },
                { maxLength: 255 },
              ],
            },
            description: {
              type: "string",
              allOf: [
                { transform: ["trim"] },
                { minLength: 5 },
                { maxLength: 2000 },
              ],
            },
          },
          required: ["name", "description"],
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              id: { type: "number" },
            },
          },
        },
      },
    },
    async (request: ItemsCreateRequest, reply) => {
      const itemId = await UserController.create(server.knex, request.body)
      reply.send({ id: itemId })
    }
  )

  next()
}
