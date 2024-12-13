/*
  Warnings:

  - You are about to drop the column `variantId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethodId` on the `Order` table. All the data in the column will be lost.
  - The `discount` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `costPrice` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `priceDifference` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Variant` table. All the data in the column will be lost.
  - The `status` column on the `Variant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductSuppliers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `TwoFactorConfirmation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `gg_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_variantId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "TwoFactorConfirmation" DROP CONSTRAINT "TwoFactorConfirmation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSuppliers" DROP CONSTRAINT "_ProductSuppliers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSuppliers" DROP CONSTRAINT "_ProductSuppliers_B_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "variantId",
ADD COLUMN     "amount" DOUBLE PRECISION,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentMethodId",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isFeatured" BOOLEAN DEFAULT false,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "taxId" TEXT,
DROP COLUMN "discount",
ADD COLUMN     "discount" DOUBLE PRECISION,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "TwoFactorConfirmation" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "address" VARCHAR(200),
ADD COLUMN     "cover_images" TEXT[],
ADD COLUMN     "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "faculty" JSONB,
ADD COLUMN     "first_name" VARCHAR(50),
ADD COLUMN     "gg_id" UUID NOT NULL,
ADD COLUMN     "guild_id" UUID,
ADD COLUMN     "image_urls" TEXT[],
ADD COLUMN     "last_name" VARCHAR(50),
ADD COLUMN     "oauth_provider" VARCHAR(50),
ADD COLUMN     "oauth_token" VARCHAR(255),
ADD COLUMN     "otp" INTEGER,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "phone_number" VARCHAR(15),
ADD COLUMN     "region" JSONB,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("gg_id");

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "costPrice",
DROP COLUMN "createdAt",
DROP COLUMN "priceDifference",
DROP COLUMN "productId",
DROP COLUMN "salePrice",
DROP COLUMN "updatedAt",
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "PaymentMethod";

-- DropTable
DROP TABLE "_ProductSuppliers";

-- CreateTable
CREATE TABLE "cards" (
    "card_id" UUID NOT NULL,
    "gg_id" UUID NOT NULL,
    "type" VARCHAR(50),
    "name" VARCHAR(50),
    "description" TEXT,
    "date_in" VARCHAR,
    "date_out" VARCHAR,
    "blood_group" TEXT,
    "emergency_contact" TEXT,
    "emergency_details" TEXT,
    "emergency_address" TEXT,

    CONSTRAINT "card_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "experience" (
    "experience_id" UUID NOT NULL,
    "gg_id" UUID NOT NULL,
    "type" VARCHAR(50),
    "name" VARCHAR(50),
    "description" TEXT,
    "tools" TEXT[],
    "project_skills" TEXT[],
    "project_pictures" TEXT[],
    "link" TEXT,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "skills" (
    "skill_id" UUID NOT NULL,
    "skill" JSONB[],
    "gg_id" UUID NOT NULL,
    "certifications" TEXT[],

    CONSTRAINT "skills_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "avatar_id" UUID NOT NULL,
    "gg_id" UUID NOT NULL,
    "avatar_url" VARCHAR(255),

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("avatar_id")
);

-- CreateTable
CREATE TABLE "PaymentType" (
    "id" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,

    CONSTRAINT "PaymentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "var_id" TEXT NOT NULL,
    "var_opt" TEXT,
    "productId" TEXT NOT NULL,
    "var_img" TEXT,
    "salePrice" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "priceDifference" DOUBLE PRECISION,
    "costPrice" DOUBLE PRECISION,
    "discount" DOUBLE PRECISION,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesInvoice" (
    "id" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "InvoiceId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "SalesInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tax" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPaymentMethod" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "typeId" TEXT NOT NULL,
    "provider" TEXT,
    "account_number" TEXT,
    "expiry_date" TIMESTAMP(3),
    "is_default" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserPaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantOption" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "var_id" TEXT NOT NULL,
    "variantName" TEXT,

    CONSTRAINT "VariantOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSupplier" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CartToProductVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SalesInvoiceToTax" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SalesInvoice_InvoiceId_key" ON "SalesInvoice"("InvoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesInvoice_orderId_key" ON "SalesInvoice"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSupplier_AB_unique" ON "_ProductToSupplier"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSupplier_B_index" ON "_ProductToSupplier"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToProductVariant_AB_unique" ON "_CartToProductVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToProductVariant_B_index" ON "_CartToProductVariant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SalesInvoiceToTax_AB_unique" ON "_SalesInvoiceToTax"("A", "B");

-- CreateIndex
CREATE INDEX "_SalesInvoiceToTax_B_index" ON "_SalesInvoiceToTax"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "card_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "Tax"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_var_id_fkey" FOREIGN KEY ("var_id") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_var_opt_fkey" FOREIGN KEY ("var_opt") REFERENCES "VariantOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesInvoice" ADD CONSTRAINT "SalesInvoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PaymentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_var_id_fkey" FOREIGN KEY ("var_id") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSupplier" ADD CONSTRAINT "_ProductToSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSupplier" ADD CONSTRAINT "_ProductToSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToProductVariant" ADD CONSTRAINT "_CartToProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToProductVariant" ADD CONSTRAINT "_CartToProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesInvoiceToTax" ADD CONSTRAINT "_SalesInvoiceToTax_A_fkey" FOREIGN KEY ("A") REFERENCES "SalesInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesInvoiceToTax" ADD CONSTRAINT "_SalesInvoiceToTax_B_fkey" FOREIGN KEY ("B") REFERENCES "Tax"("id") ON DELETE CASCADE ON UPDATE CASCADE;
