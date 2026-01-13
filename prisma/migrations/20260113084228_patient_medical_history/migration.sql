-- CreateTable
CREATE TABLE "medical_history" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "start_date" VARCHAR(255) NOT NULL,
    "images" VARCHAR(255)[],
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "medical_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "medical_history_userId_idx" ON "medical_history"("userId");

-- CreateIndex
CREATE INDEX "OTP_userId_idx" ON "OTP"("userId");

-- AddForeignKey
ALTER TABLE "medical_history" ADD CONSTRAINT "medical_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
