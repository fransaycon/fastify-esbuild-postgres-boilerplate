import fastify from "fastify"
import fastifyCorsPlugin from "@fastify/cors"

import ApiError from "@/components/api-error"
import knexPlugin from "@/plugins/knexPlugin"
import healthRoutes from "@/routes/v1/health-routes"
import itemRoutes from "@/routes/v1/item-routes"

function createServer() {
  const server = fastify()
  server.register(fastifyCorsPlugin)
  server.register(knexPlugin)

  server.register(healthRoutes, { prefix: "/v1" })
  server.register(itemRoutes, { prefix: "/v1" })

  server.setErrorHandler((error, req, res) => {
    if (error instanceof ApiError) {
      res.status(error.statusCode).send({
        message: error.message,
        payload: error.payload,
      })
    } else {
      console.error(error)
      res.status(500).send({
        message: "Something went wrong. Please try again.",
      })
    }
  })

  return server
}

export default createServer
