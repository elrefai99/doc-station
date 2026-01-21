/*
  Warnings:

  - You are about to alter the column `description` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `content` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(255);
