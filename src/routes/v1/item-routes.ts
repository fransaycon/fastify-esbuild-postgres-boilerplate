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
            name: { type: "string" },
            description: { type: "string" },
          },
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
    async (req: ItemsCreateRequest, res) => {
      const itemId = await UserController.create(server.knex, req.body)
      res.send({ id: itemId })
    }
  )

  next()
}
