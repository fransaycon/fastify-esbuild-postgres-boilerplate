export default function healthRoutes(server, _options, next) {
  server.get(
    "/",
    {
      schema: {
        description: "Check if API is ok and up and running. ;)",
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              status: { type: "string" },
            },
          },
        },
      },
    },
    (_request, reply) => {
      reply.send({ status: "ok" })
    }
  )

  next()
}
