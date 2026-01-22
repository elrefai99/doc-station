-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_adminId_fkey";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "adminId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
