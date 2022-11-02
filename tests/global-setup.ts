import connectTestDatabase from "./utils/connect-test-database"

async function setupDatabase() {
  const knexInstance = connectTestDatabase()

  try {
    await knexInstance.migrate.latest()
    // await knexInstance.seed.run()
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await knexInstance.destroy()
  }
}

export default setupDatabase
