-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "inventoryStockStatus" AS ENUM ('AVAILABLE', 'LOWSTOCK', 'NOTAVAILABLE');

-- CreateEnum
CREATE TYPE "paymentType" AS ENUM ('CASH', 'CARD');

-- CreateEnum
CREATE TYPE "TopupStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "TopupType" AS ENUM ('CREDIT', 'CASH', 'GGCOIN');

-- CreateEnum
CREATE TYPE "cardType" AS ENUM ('STUDENT', 'BUSINESS', 'DEVELOPER', 'GAMER');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('GOODIDEA', 'THANKS', 'WOW', 'HAHA', 'LOVE');

-- CreateEnum
CREATE TYPE "socialType" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'GITHUB', 'STEAM', 'LINKDN', 'GOOGLE');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('AVAILABLE', 'NOTAVAILABLE');

-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('PENDING', 'CHECKOUT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountType" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "userId" UUID NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullName" TEXT,
    "userName" TEXT[],
    "email" TEXT[],
    "mobilePhone" TEXT[],
    "emailVerified" TIMESTAMP(3),
    "imageUser" TEXT[],
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "address" VARCHAR(50)[],
    "faculty" VARCHAR(50),
    "emergencyContactNumber" VARCHAR(50),
    "emergencyContactName" VARCHAR(50),
    "enrollDate" TIMESTAMP(3),
    "expireDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "expires" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT[],
    "salePrice" DOUBLE PRECISION,
    "costPrice" DOUBLE PRECISION,
    "stockQuantity" INTEGER NOT NULL,
    "brand" TEXT,
    "rating" INTEGER NOT NULL,
    "categoryId" UUID NOT NULL,
    "reviews" TEXT[],
    "isFeatured" BOOLEAN DEFAULT false,
    "taxId" UUID,
    "discount" DOUBLE PRECISION,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quantity" INTEGER NOT NULL,
    "status" "CartStatus" NOT NULL DEFAULT 'PENDING',
    "productId" UUID NOT NULL,
    "orderId" UUID,
    "amount" DOUBLE PRECISION,
    "userId" UUID NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "stockStatus" "inventoryStockStatus" NOT NULL DEFAULT 'AVAILABLE',
    "quantityAvailable" INTEGER NOT NULL,
    "thresholdValue" INTEGER NOT NULL,
    "stockUpdatedDate" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supplierName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderQuantity" INTEGER NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "streetAddress" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "discount" DOUBLE PRECISION,
    "orderAmount" DOUBLE PRECISION,
    "paymentId" UUID,
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "paymentType" "paymentType" NOT NULL DEFAULT 'CARD',

    CONSTRAINT "PaymentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "var_id" UUID NOT NULL,
    "var_opt" UUID,
    "productId" UUID NOT NULL,
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
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "InvoiceId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION,
    "orderId" UUID NOT NULL,

    CONSTRAINT "SalesInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tax" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPaymentMethod" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "typeId" UUID NOT NULL,
    "provider" TEXT,
    "account_number" TEXT,
    "expiry_date" TIMESTAMP(3),
    "is_default" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserPaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantOption" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" TEXT NOT NULL,
    "var_id" UUID NOT NULL,
    "variantName" TEXT,

    CONSTRAINT "VariantOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "categoryName" TEXT NOT NULL,
    "categoryDescription" TEXT,
    "categoryImage" TEXT[],

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitprofile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "visitedBy" TEXT,
    "type" "ReactionType",
    "visitCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visitprofile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topup" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" DOUBLE PRECISION NOT NULL,
    "userId" UUID NOT NULL,
    "topupType" "TopupType" NOT NULL DEFAULT 'CREDIT',
    "topupStatus" "TopupStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "cardType" "cardType" NOT NULL DEFAULT 'BUSINESS',
    "backgroundImage" TEXT[],

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSupplier" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CartToProductVariant" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductOrders" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SalesInvoiceToTax" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_token_key" ON "ResetPasswordToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_email_token_key" ON "ResetPasswordToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_categoryId_key" ON "Product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_taxId_key" ON "Product"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_productId_key" ON "Cart"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_orderId_key" ON "Cart"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "Inventory"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_var_id_key" ON "ProductVariant"("var_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_var_opt_key" ON "ProductVariant"("var_opt");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_key" ON "ProductVariant"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesInvoice_InvoiceId_key" ON "SalesInvoice"("InvoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesInvoice_orderId_key" ON "SalesInvoice"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPaymentMethod_userId_key" ON "UserPaymentMethod"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPaymentMethod_typeId_key" ON "UserPaymentMethod"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "VariantOption_var_id_key" ON "VariantOption"("var_id");

-- CreateIndex
CREATE UNIQUE INDEX "visitprofile_userId_key" ON "visitprofile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Topup_userId_key" ON "Topup"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cards_userId_key" ON "cards"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSupplier_AB_unique" ON "_ProductToSupplier"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSupplier_B_index" ON "_ProductToSupplier"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToProductVariant_AB_unique" ON "_CartToProductVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToProductVariant_B_index" ON "_CartToProductVariant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductOrders_AB_unique" ON "_ProductOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductOrders_B_index" ON "_ProductOrders"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SalesInvoiceToTax_AB_unique" ON "_SalesInvoiceToTax"("A", "B");

-- CreateIndex
CREATE INDEX "_SalesInvoiceToTax_B_index" ON "_SalesInvoiceToTax"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "Tax"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "UserPaymentMethod" ADD CONSTRAINT "UserPaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_var_id_fkey" FOREIGN KEY ("var_id") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitprofile" ADD CONSTRAINT "visitprofile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Topup" ADD CONSTRAINT "Topup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSupplier" ADD CONSTRAINT "_ProductToSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSupplier" ADD CONSTRAINT "_ProductToSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToProductVariant" ADD CONSTRAINT "_CartToProductVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToProductVariant" ADD CONSTRAINT "_CartToProductVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductOrders" ADD CONSTRAINT "_ProductOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductOrders" ADD CONSTRAINT "_ProductOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesInvoiceToTax" ADD CONSTRAINT "_SalesInvoiceToTax_A_fkey" FOREIGN KEY ("A") REFERENCES "SalesInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SalesInvoiceToTax" ADD CONSTRAINT "_SalesInvoiceToTax_B_fkey" FOREIGN KEY ("B") REFERENCES "Tax"("id") ON DELETE CASCADE ON UPDATE CASCADE;
