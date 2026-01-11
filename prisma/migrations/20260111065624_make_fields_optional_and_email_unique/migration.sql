/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "code" SET DEFAULT '',
ALTER COLUMN "phone" SET DEFAULT '',
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "city" SET DEFAULT '',
ALTER COLUMN "state" SET DEFAULT '',
ALTER COLUMN "zip" SET DEFAULT '',
ALTER COLUMN "avatar" SET DEFAULT '',
ALTER COLUMN "Bio" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
