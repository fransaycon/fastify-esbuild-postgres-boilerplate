import fp from "fastify-plugin"
import fastifyCorsPlugin from "@fastify/cors"

function corsPlugion(server, _options, next) {
  server.register(fastifyCorsPlugin)
  next()
}

export default fp(corsPlugion)
