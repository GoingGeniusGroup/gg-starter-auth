-- CreateEnum
CREATE TYPE "TopupStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "TopupType" AS ENUM ('CREDIT', 'CASH', 'GGCOIN');

-- CreateTable
CREATE TABLE "Topup" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TopupType" NOT NULL DEFAULT 'CREDIT',
    "status" "TopupStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Topup" ADD CONSTRAINT "Topup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
