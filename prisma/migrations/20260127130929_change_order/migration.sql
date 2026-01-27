/*
  Warnings:

  - You are about to drop the column `idBooking` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('PAYMOB', 'PAYFORT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'REFUNDED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "idBooking",
DROP COLUMN "idProduct",
ADD COLUMN     "isBooking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isProduct" BOOLEAN NOT NULL DEFAULT false;
