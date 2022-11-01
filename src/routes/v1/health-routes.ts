export default function healthRoutes(server, options, next) {
  server.get("/", (req, res) => {
    res.send({ status: "ok" })
  })

  next()
}
