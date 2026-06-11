/*
  Warnings:

  - You are about to alter the column `description` on the `Blogs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `url` on the `Gallery` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to drop the column `Trnx_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `bookingId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `card_number` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `currencies` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `data_message` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `doctorId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `hmac_signature` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `idBooking` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `method_payment` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_getway` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_getway_code` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_getway_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `Bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isExpired` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isExpiredSoon` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isExpiring` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isLocked` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isSuspended` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatePAssword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `status` on the `notification` table. All the data in the column will be lost.
  - You are about to alter the column `content` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `link` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OTP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dmChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `governorate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medical_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[site_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('DOCTOR', 'PATIENT');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BOOKING', 'PAYMENT', 'MESSAGE', 'REVIEW', 'SYSTEM', 'GENERAL');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('BOOKING', 'PRODUCT');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_patientId_fkey";

-- DropForeignKey
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_patientId_fkey";

-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_governorate_number_fkey";

-- DropForeignKey
ALTER TABLE "dmChat" DROP CONSTRAINT "dmChat_chatID_fkey";

-- DropForeignKey
ALTER TABLE "dmChat" DROP CONSTRAINT "dmChat_senderID_fkey";

-- DropForeignKey
ALTER TABLE "doctor_profile" DROP CONSTRAINT "doctor_profile_cityId_fkey";

-- DropForeignKey
ALTER TABLE "doctor_profile" DROP CONSTRAINT "doctor_profile_governorateId_fkey";

-- DropForeignKey
ALTER TABLE "doctor_profile" DROP CONSTRAINT "doctor_profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "medical_history" DROP CONSTRAINT "medical_history_userId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_receiverID_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_senderID_fkey";

-- DropIndex
DROP INDEX "User_createdAt_idx";

-- DropIndex
DROP INDEX "User_role_idx";

-- DropIndex
DROP INDEX "User_status_idx";

-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "authorId" INTEGER,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "Gallery" ALTER COLUMN "url" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "Trnx_id",
DROP COLUMN "bookingId",
DROP COLUMN "card_number",
DROP COLUMN "currencies",
DROP COLUMN "data_message",
DROP COLUMN "date",
DROP COLUMN "doctorId",
DROP COLUMN "hmac_signature",
DROP COLUMN "idBooking",
DROP COLUMN "idProduct",
DROP COLUMN "method_payment",
DROP COLUMN "patientId",
DROP COLUMN "payment_getway",
DROP COLUMN "payment_getway_code",
DROP COLUMN "payment_getway_status",
DROP COLUMN "payment_type",
DROP COLUMN "price",
DROP COLUMN "time",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "appointmentId" INTEGER,
ADD COLUMN     "cardNumber" VARCHAR(20) NOT NULL DEFAULT '',
ADD COLUMN     "currency" VARCHAR(10) NOT NULL DEFAULT 'EGP',
ADD COLUMN     "gatewayCode" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN     "gatewayMessage" VARCHAR(500) NOT NULL DEFAULT '',
ADD COLUMN     "hmac" VARCHAR(500) NOT NULL DEFAULT '',
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentGateway" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "paymentGatewayStatus" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "paymentMethod" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "paymentType" VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN     "refundReason" VARCHAR(500),
ADD COLUMN     "transactionId" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "type" "OrderType" NOT NULL DEFAULT 'BOOKING';

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "content" SET DATA TYPE VARCHAR(2000);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Bio",
DROP COLUMN "address",
DROP COLUMN "avatar",
DROP COLUMN "city",
DROP COLUMN "fullname",
DROP COLUMN "isActive",
DROP COLUMN "isArchived",
DROP COLUMN "isDeleted",
DROP COLUMN "isExpired",
DROP COLUMN "isExpiredSoon",
DROP COLUMN "isExpiring",
DROP COLUMN "isLocked",
DROP COLUMN "isSuspended",
DROP COLUMN "isVerified",
DROP COLUMN "state",
DROP COLUMN "status",
DROP COLUMN "updatePAssword",
DROP COLUMN "zip",
ADD COLUMN     "fName" TEXT NOT NULL,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "lName" TEXT NOT NULL,
ADD COLUMN     "site_id" TEXT NOT NULL,
ADD COLUMN     "userType" "UserType" NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "code" DROP DEFAULT,
ALTER COLUMN "code" SET DATA TYPE TEXT,
ALTER COLUMN "phone" DROP DEFAULT,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "username" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "status",
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD COLUMN     "type" "NotificationType" NOT NULL DEFAULT 'GENERAL',
ALTER COLUMN "content" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "link" SET DATA TYPE VARCHAR(500);

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "OTP";

-- DropTable
DROP TABLE "city";

-- DropTable
DROP TABLE "dmChat";

-- DropTable
DROP TABLE "doctor_profile";

-- DropTable
DROP TABLE "governorate";

-- DropTable
DROP TABLE "medical_history";

-- DropTable
DROP TABLE "rooms";

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "OTPStatus";

-- DropEnum
DROP TYPE "UserRole";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "DoctorProfile" (
    "id" SERIAL NOT NULL,
    "site_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "specialty" TEXT,
    "bio" TEXT,
    "experience" INTEGER,
    "clinicName" VARCHAR(255),
    "clinicPhone" VARCHAR(20),
    "clinicAddress" VARCHAR(500),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "education" VARCHAR(2000),
    "priceInPerson" INTEGER NOT NULL DEFAULT 0,
    "priceOnline" INTEGER NOT NULL DEFAULT 0,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slotDuration" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorProfile_id_key" ON "DoctorProfile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorProfile_site_id_key" ON "DoctorProfile"("site_id");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorProfile_userId_key" ON "DoctorProfile"("userId");

-- CreateIndex
CREATE INDEX "DoctorProfile_userId_idx" ON "DoctorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_id_key" ON "Appointment"("id");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_appointmentId_idx" ON "Order"("appointmentId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_transactionId_idx" ON "Order"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_site_id_key" ON "User"("site_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "notification_userId_idx" ON "notification"("userId");

-- CreateIndex
CREATE INDEX "notification_isRead_idx" ON "notification"("isRead");

-- AddForeignKey
ALTER TABLE "DoctorProfile" ADD CONSTRAINT "DoctorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
