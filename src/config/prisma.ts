import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL : process.env.POSTGRESQL_URI as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

prisma.$connect().then(() => {
     console.log(`✅ Success connected to ${process.env.NODE_ENV === 'development' ? 'development' : 'production'} Database`)
}).catch((error) => {
     console.log(error);
})

export default prisma;
