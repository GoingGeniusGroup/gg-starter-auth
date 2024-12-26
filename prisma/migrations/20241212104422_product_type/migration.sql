-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('VIRTUAL', 'PHYSICAL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'VIRTUAL';
