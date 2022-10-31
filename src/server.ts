import fastify from "fastify"

import healthHandler from "./modules/health/routes"
import fastifyCorsPlugin from "@fastify/cors"

function createServer() {
  const server = fastify()
  server.register(fastifyCorsPlugin)

  server.register(healthHandler, { prefix: "/health" })

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  return server
}

export default createServer
