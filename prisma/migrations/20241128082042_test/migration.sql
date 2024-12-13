/*
  Warnings:

  - You are about to drop the column `skill` on the `skills` table. All the data in the column will be lost.
  - Added the required column `skill_name` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill_percentage` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skills" DROP COLUMN "skill",
ADD COLUMN     "skill_name" TEXT NOT NULL,
ADD COLUMN     "skill_percentage" INTEGER NOT NULL;
