/*
  Warnings:

  - The primary key for the `guilds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `faculty` on the `guilds` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `guilds` table. All the data in the column will be lost.
  - Added the required column `faculty_id` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - The required column `guild_id` was added to the `guilds` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "guilds" DROP CONSTRAINT "guilds_pkey",
DROP COLUMN "faculty",
DROP COLUMN "id",
ADD COLUMN     "faculty_id" UUID NOT NULL,
ADD COLUMN     "guild_id" UUID NOT NULL,
ADD CONSTRAINT "guilds_pkey" PRIMARY KEY ("guild_id");

-- CreateTable
CREATE TABLE "coordinate" (
    "id" UUID NOT NULL,
    "gg_id" UUID NOT NULL,
    "longitude" TEXT,
    "latitude" TEXT,

    CONSTRAINT "coordinate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faculty" (
    "id" UUID NOT NULL,
    "description" TEXT,
    "faculty_name" TEXT,
    "faculty_img" TEXT,
    "skills" TEXT[],
    "symbol" TEXT,
    "color" TEXT,
    "alignment" TEXT[],
    "element" TEXT,

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "faculty_faculty_name_key" ON "faculty"("faculty_name");

-- AddForeignKey
ALTER TABLE "coordinate" ADD CONSTRAINT "coordinate_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "guilds" ADD CONSTRAINT "guilds_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
