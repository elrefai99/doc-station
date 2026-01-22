/*
  Warnings:

  - Added the required column `adminId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_brandId_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "adminId" INTEGER NOT NULL,
ALTER COLUMN "brandId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Products_adminId_idx" ON "Products"("adminId");

-- CreateIndex
CREATE INDEX "Products_slug_idx" ON "Products"("slug");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
