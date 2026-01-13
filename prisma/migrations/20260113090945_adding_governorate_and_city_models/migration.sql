/*
  Warnings:

  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `medical_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Brands" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "medical_history" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "doctor_profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "governorateId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "timeStart" VARCHAR(255) NOT NULL,
    "timeEnd" VARCHAR(255) NOT NULL,
    "dateFrom" VARCHAR(255) NOT NULL,
    "dateTo" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "governorate" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "governorate_name_ar" TEXT NOT NULL,
    "governorate_name_en" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "governorate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "governorate_number" TEXT NOT NULL,
    "city_name_ar" TEXT NOT NULL,
    "city_name_en" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "doctor_profile_userId_idx" ON "doctor_profile"("userId");

-- AddForeignKey
ALTER TABLE "doctor_profile" ADD CONSTRAINT "doctor_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_profile" ADD CONSTRAINT "doctor_profile_governorateId_fkey" FOREIGN KEY ("governorateId") REFERENCES "governorate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_profile" ADD CONSTRAINT "doctor_profile_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_number_fkey" FOREIGN KEY ("number") REFERENCES "governorate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
