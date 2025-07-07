
import * as dotenv from "dotenv"
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: ".env.local" })
if (!process.env.DATABASE_URL) {
    throw new Error("Database url is not set in .env.local");
}
export default defineConfig({
    out: './my-app/drizzle', // where output generted files are present
    schema: './lib/db/schema.ts', // where your schema lives
    dialect: 'postgresql',// which sqp dialect to use
    dbCredentials: {
        url: process.env.DATABASE_URL!, // use the loaded env variable as the connection string for the database
    },
    migrations: {//internal settings for how Drizzle tracks which migrations have been run
        schema: "public",// the db schema
        table: "__drizzle_migration",// where migration history is saveed in ypur db
    },
    verbose: true,// log detailed output when running commands
    strict: true,// enforce more validation rules(catches mistakes early)
});





