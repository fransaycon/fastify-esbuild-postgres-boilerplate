import fastify from "fastify"

import healthRoutes from "./routes/v1/health-routes"
import fastifyCorsPlugin from "@fastify/cors"
import sequelizePlugin from "./plugins/sequelizePlugin"
import itemRoutes from "./routes/v1/item-routes"

function createServer() {
  const server = fastify()
  server.register(fastifyCorsPlugin)
  server.register(sequelizePlugin)

  server.register(healthRoutes, { prefix: "/v1" })
  server.register(itemRoutes, { prefix: "/v1/items" })

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  return server
}

export default createServer
