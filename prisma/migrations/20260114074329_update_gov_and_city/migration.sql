/*
  Warnings:

  - Changed the type of `governorate_number` on the `city` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `number` on the `governorate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "city" DROP COLUMN "governorate_number",
ADD COLUMN     "governorate_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "governorate" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "doctor_profile_governorateId_idx" ON "doctor_profile"("governorateId");

-- CreateIndex
CREATE INDEX "doctor_profile_cityId_idx" ON "doctor_profile"("cityId");
