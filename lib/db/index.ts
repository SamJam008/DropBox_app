import { drizzle } from  "drizzle-orm/neon-http"; // drizzle adapter for neon(a severless postgres provider) that uses HTTP-based connections, instead of TCP or WebSockets
import { neon } from "@neondatabase/serverless"; // creates a connection client for querying your Neon DB

import * as schema from "./schema" // bringing in all definitions to let drizzle know what schema to expect 
if (!process.env.DATABASE_URL) {
    throw new Error("Database url is not set in environment");
}
const sql = neon(process.env.DATABASE_URL!)// reads env variables for database string..! I am sure this value is defined
export const db = drizzle(sql, { schema })// via drizzle

export { sql } ; // raw sql client, queries

