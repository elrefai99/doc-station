/*
  Warnings:

  - Changed the type of `otp` on the `OTP` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OTPStatus" AS ENUM ('PENDING', 'VERIFIED', 'EXPIRED', 'FAILED');

-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "status" "OTPStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "otp",
ADD COLUMN     "otp" INTEGER NOT NULL;
