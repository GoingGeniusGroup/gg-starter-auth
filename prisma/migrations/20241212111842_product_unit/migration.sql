-- CreateEnum
CREATE TYPE "ProductUnit" AS ENUM ('PIECE', 'KG', 'GRAM');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unit" "ProductUnit" NOT NULL DEFAULT 'PIECE';
