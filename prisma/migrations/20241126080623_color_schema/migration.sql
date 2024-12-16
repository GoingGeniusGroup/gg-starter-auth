-- CreateEnum
CREATE TYPE "ThemeType" AS ENUM ('THEME', 'TEXT');

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "type" "ThemeType" NOT NULL,
    "value" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_userId_key" ON "Color"("userId");

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE CASCADE;
