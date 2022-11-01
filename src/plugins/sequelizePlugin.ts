import fp from "fastify-plugin"
import { FastifyPluginAsync } from "fastify"
import { Sequelize } from "sequelize"
import * as dotenv from "dotenv"
import path from "path"
import { fetchExpression } from "fs-recursive"

const componentDirectory = path.join(process.cwd(), "src/components")

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize
  }
}

dotenv.config()

const sequelizePlugin: FastifyPluginAsync = fp(async (server, _options) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL as string)
  const db = {}

  const files = await fetchExpression(
    componentDirectory,
    /.*\.model.ts$/,
    "utf-8"
  )

  for (const entry of files.entries()) {
    for (let i = 0; i < entry.values.length; i++) {
      const modelFile = entry.values[i]
      console.log(modelFile)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const model = require(modelFile.path)(sequelize)
      db[model.name] = model
    }
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) db[modelName].associate(db)
  })

  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }

  try {
    await sequelize.sync({ alter: true, logging: true })
  } catch (error) {
    console.error("Something went wrong in syncing database models")
  }

  db["sequelize"] = sequelize
  server.decorate("db", db)

  server.addHook("onClose", async (server) => {
    await server.sequelize.close()
  })
})

export default sequelizePlugin
