import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from './schema';

let sslmode = "";
if (process.env.APP_ENV === "production"){
  sslmode = "?sslmode=require"; 
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL + sslmode
});

export const db = drizzle(pool, { schema });
