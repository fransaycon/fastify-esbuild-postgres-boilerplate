import connectTestDatabase from "./utils/connect-test-database"

async function tearDown() {
  const knex = connectTestDatabase()

  try {
    await knex.raw(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
            EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || '';
        END LOOP;
      END $$;
    `)
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await knex.destroy()
  }
}

export default tearDown
