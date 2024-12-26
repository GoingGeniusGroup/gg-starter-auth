/*
  Warnings:

  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "cardType" AS ENUM ('STUDENT', 'BUSINESS', 'DEVELOPER', 'GAMER');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "cardType" NOT NULL DEFAULT 'BUSINESS',
    "userName" VARCHAR(50),
    "userField" VARCHAR(50),
    "email" VARCHAR(50),
    "phone" VARCHAR(50),
    "location" VARCHAR(50),
    "studentFaculty" VARCHAR(50),
    "emergencyContact" VARCHAR(50),
    "emergenctName" VARCHAR(50),
    "backgroundImage" TEXT[],
    "enrollDate" TIMESTAMP(3),
    "expireDate" TIMESTAMP(3),

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
