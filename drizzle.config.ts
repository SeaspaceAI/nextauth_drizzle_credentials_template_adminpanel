import type { Config } from 'drizzle-kit';

let sslmode = "";
if(process.env.APP_ENV === "production"){
  sslmode = "?sslmode=require";
}

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL + sslmode,
  },
  verbose:true,
  strict:true
} satisfies Config;