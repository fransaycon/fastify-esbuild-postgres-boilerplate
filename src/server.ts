import fastify from "fastify"
import fastifyAutoload from "@fastify/autoload"

import ApiError from "@/components/api-error"
import path from "path"
import ajvKeywords from "ajv-keywords"

async function createServer() {
  const server = fastify({
    ajv: {
      plugins: [[ajvKeywords, ["transform"]]],
    },
  })

  server.register(fastifyAutoload, {
    dir: path.join(__dirname, "plugins"),
  })

  server.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"),
  })

  server.setErrorHandler((error, _request, reply) => {
    if (error.validation) {
      reply.status(400).send(error.validation)
    } else if (error instanceof ApiError) {
      reply.status(error.statusCode).send({
        message: error.message,
        payload: error.payload,
      })
    } else {
      console.error(error)
      reply.status(500).send({
        message: "Something went wrong. Please try again.",
      })
    }
  })

  return server
}

export default createServer
