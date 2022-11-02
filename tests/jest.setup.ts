import connectTestDatabase from "./utils/connect-test-database"

const knex = connectTestDatabase()

afterEach(async () => {
  try {
    await knex.raw(`
          DO $$ DECLARE
            r RECORD;
          BEGIN
            FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
                EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || '';
            END LOOP;
          END $$;
        `)
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await knex.destroy()
  }
})
