-- CreateTable
CREATE TABLE "VirtualProduct" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "ImageUrl" TEXT[],
    "ratings" DOUBLE PRECISION NOT NULL,
    "sourceFile" TEXT[],
    "animation" TEXT,

    CONSTRAINT "VirtualProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VirtualProduct" ADD CONSTRAINT "VirtualProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
