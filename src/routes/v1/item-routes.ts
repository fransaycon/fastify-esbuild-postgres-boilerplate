export default function itemRoutes(server, options, next) {
  server.post("/", async (req, res) => {
    const unsavedItem = this.db.items.create({
      name: req.body.name,
      description: req.body.description,
    })
    await unsavedItem.save()
    res.send({ unsavedItem })
  })

  next()
}
