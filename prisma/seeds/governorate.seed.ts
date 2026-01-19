import { PrismaClient } from '../../src/generated/prisma';
import { governorateData } from '../../src/json/governorate.json';

const prisma = new PrismaClient();

async function seedGovernorates() {
     console.log('🌱 Seeding governorates...');

     try {
          // Check if data already exists
          const count = await prisma.governorate.count();

          if (count > 0) {
               console.log(`Governorates already seeded (${count} records found)`);
               return;
          }

          // Insert governorates
          for (const gov of governorateData) {
               await prisma.governorate.create({
                    data: {
                         number: gov.number,
                         governorate_name_ar: gov.governorate_name_ar,
                         governorate_name_en: gov.governorate_name_en,
                    },
               });
          }

          const finalCount = await prisma.governorate.count();
          console.log(`Successfully seeded ${finalCount} governorates`);
     } catch (error) {
          console.error('Error seeding governorates:', error);
          throw error;
     } finally {
          await prisma.$disconnect();
     }
}

seedGovernorates()
     .catch((error) => {
          console.error(error);
          process.exit(1);
     });
