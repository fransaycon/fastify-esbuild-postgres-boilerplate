import { UnsavedItem } from "@/components/items/items"
import UserController from "@/components/items/items-controllers"
import { FastifyWithKnex } from "../../common"
import { FastifyRequest } from "fastify"

type ItemsCreateRequest = FastifyRequest<{
  Body: UnsavedItem
}>

export default function itemRoutes(server: FastifyWithKnex, options, next) {
  server.post("/items", async (req: ItemsCreateRequest, res) => {
    const unsavedItem = await UserController.create(server.knex, req.body)
    res.send(unsavedItem)
  })

  next()
}
