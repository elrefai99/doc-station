-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "Trnx_id" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "card_number" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "currencies" TEXT NOT NULL DEFAULT 'EGP',
ADD COLUMN     "data_message" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "hmac_signature" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "method_payment" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "payment_getway" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "payment_getway_code" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "payment_getway_status" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "payment_type" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
