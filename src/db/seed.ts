import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { groups, users } from "./schema";
import "dotenv/config"
import { faker } from '@faker-js/faker';
import { randomInt } from "crypto";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const db = drizzle(pool);

async function main(){
  console.log("Seeding started...");

  const groupsArr:number[] = [];
  
  for(let i=0;i<3;i++){
    await db.insert(groups).values({
      group_name: faker.company.name(),
    })
    .returning()
    .then((res) => {
      groupsArr.push(res[0].id as number)
    })
  }

  await db.insert(users).values({
    name: faker.person.fullName(),
    email: "admin@admin.com",
    emailVerified: faker.date.past(),
    password: "$2a$12$2KtRSelSy4Fn9DJj.QH6RuKEPmmsQwwYbrobMBin54bumpdI4HNBy",
    role: "admin",
    firstPasswordChange: true
  })

  for(let i=0;i<10;i++){
    await db.insert(users).values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.date.past(),
      password: "$2a$12$2KtRSelSy4Fn9DJj.QH6RuKEPmmsQwwYbrobMBin54bumpdI4HNBy",
      role: "user",
      firstPasswordChange: false,
      groupId: groupsArr[randomInt(0,3)]
    })
  }

  console.log("Seeding finished!");
  process.exit(0);
}

main()
.then()
.catch(error => {
  console.log("error: ", error);
  process.exit(0);
})