-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive', 'pending', 'block');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'pending';
