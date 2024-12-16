/*
  Warnings:

  - Changed the type of `skill` on the `skills` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "skills" DROP COLUMN "skill",
ADD COLUMN     "skill" JSONB NOT NULL;
