import '../config/dotenv.conf'
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL : process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

process.on('SIGTERM', async () => {
     console.log('SIGTERM received, closing MongoDB connection...');
     await prisma.$disconnect();
     process.exit(0);
});

process.on('SIGINT', async () => {
     console.log('SIGINT received, closing MongoDB connection...');
     await prisma.$disconnect();
     process.exit(0);
});

prisma.$connect().then(() => {
     require('./Emails/worker.emails');
     console.log('⛁  Prisma connected for workers');
     console.log('🚀 All workers started successfully!');
});
