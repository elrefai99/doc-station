-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_number_fkey";

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_governorate_number_fkey" FOREIGN KEY ("governorate_number") REFERENCES "governorate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
