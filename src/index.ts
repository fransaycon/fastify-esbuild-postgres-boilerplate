/* eslint-disable @typescript-eslint/ban-ts-comment */
import createServer from "./server"

async function run() {
  const server = await createServer()

  await server.ready()

  server.listen({ port: 8000, host: "0.0.0.0" }, (err, address) => {
    if (err) throw err
    console.log(`server listening on ${address}`)
  })
}

run()
