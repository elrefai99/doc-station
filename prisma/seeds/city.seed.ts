import { PrismaClient } from '../../src/generated/prisma';
import { cityData } from '../../src/json/region.json';

const prisma = new PrismaClient();

async function seedCities() {
     console.log('Seeding cities...');

     try {
          // Check if data already exists
          const count = await prisma.city.count();

          if (count > 0) {
               console.log(`Cities already seeded (${count} records found)`);
               return;
          }

          // Insert cities
          for (const city of cityData) {
               await prisma.city.create({
                    data: {
                         number: city.number,
                         governorate_number: city.governorate_number,
                         city_name_ar: city.city_name_ar,
                         city_name_en: city.city_name_en,
                    },
               });
          }

          const finalCount = await prisma.city.count();
          console.log(`Successfully seeded ${finalCount} cities`);
     } catch (error) {
          console.error('Error seeding cities:', error);
          throw error;
     } finally {
          await prisma.$disconnect();
     }
}

seedCities()
     .catch((error) => {
          console.error(error);
          process.exit(1);
     });
