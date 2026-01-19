import { PrismaClient } from '../../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { governorateData } from '../../src/json/governorate.json';
import { cityData } from '../../src/json/region.json';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env' });

const pool = new Pool({
     connectionString: process.env.NODE_ENV === 'development'
          ? process.env.DATABASE_URL
          : process.env.DATABASE_URL as string
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedAll() {
     console.log('🌱 Starting database seeding...\n');

     try {
          // Seed Governorates
          console.log('Seeding governorates...');
          const govCount = await prisma.governorate.count();

          if (govCount === 0) {
               for (const gov of governorateData) {
                    await prisma.governorate.create({
                         data: {
                              number: gov.number,
                              governorate_name_ar: gov.governorate_name_ar,
                              governorate_name_en: gov.governorate_name_en,
                         },
                    });
               }
               const finalGovCount = await prisma.governorate.count();
               console.log(`Successfully seeded ${finalGovCount} governorates\n`);
          } else {
               console.log(`Governorates already seeded (${govCount} records found)\n`);
          }

          // Seed Cities
          console.log('Seeding cities...');
          const cityCount = await prisma.city.count();

          if (cityCount === 0) {
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
               const finalCityCount = await prisma.city.count();
               console.log(`Successfully seeded ${finalCityCount} cities\n`);
          } else {
               console.log(`Cities already seeded (${cityCount} records found)\n`);
          }

          console.log('Database seeding completed successfully!');
     } catch (error) {
          console.error('Error seeding database:', error);
          throw error;
     } finally {
          await prisma.$disconnect();
          await pool.end();
     }
}

seedAll()
     .catch((error) => {
          console.error(error);
          process.exit(1);
     });
