-- DropIndex
DROP INDEX "Order_userId_key";

-- AlterTable
ALTER TABLE "_CartToProductVariant" ADD CONSTRAINT "_CartToProductVariant_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CartToProductVariant_AB_unique";

-- AlterTable
ALTER TABLE "_ProductOrders" ADD CONSTRAINT "_ProductOrders_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProductOrders_AB_unique";

-- AlterTable
ALTER TABLE "_ProductToSupplier" ADD CONSTRAINT "_ProductToSupplier_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProductToSupplier_AB_unique";

-- AlterTable
ALTER TABLE "_SalesInvoiceToTax" ADD CONSTRAINT "_SalesInvoiceToTax_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_SalesInvoiceToTax_AB_unique";

-- CreateTable
CREATE TABLE "UserInventory" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VirtualCategory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "VirtualCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VirtualProduct" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "images" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL,
    "categoryId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "src" TEXT,
    "animation" TEXT,
    "stockQuantity" INTEGER NOT NULL,

    CONSTRAINT "VirtualProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VirtualProductOnOrder" (
    "orderId" UUID NOT NULL,
    "virtualProductId" UUID NOT NULL,

    CONSTRAINT "VirtualProductOnOrder_pkey" PRIMARY KEY ("orderId","virtualProductId")
);

-- AddForeignKey
ALTER TABLE "UserInventory" ADD CONSTRAINT "UserInventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "VirtualProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInventory" ADD CONSTRAINT "UserInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VirtualProduct" ADD CONSTRAINT "VirtualProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "VirtualCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VirtualProductOnOrder" ADD CONSTRAINT "VirtualProductOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VirtualProductOnOrder" ADD CONSTRAINT "VirtualProductOnOrder_virtualProductId_fkey" FOREIGN KEY ("virtualProductId") REFERENCES "VirtualProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
