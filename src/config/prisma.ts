import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()
console.log("🛢️  Prisma connected successfully");

export default prisma;
