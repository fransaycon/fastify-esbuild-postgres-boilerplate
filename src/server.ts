import fastify from "fastify"
import fastifyCorsPlugin from "@fastify/cors"
import fastifyAutoload from "@fastify/autoload"

import ApiError from "@/components/api-error"
import path from "path"

async function createServer() {
  const server = fastify()
  server.register(fastifyCorsPlugin)

  server.register(fastifyAutoload, {
    dir: path.join(__dirname, "plugins"),
  })

  server.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
  })

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
