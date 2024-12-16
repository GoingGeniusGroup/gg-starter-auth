/*
  Warnings:

  - Added the required column `experience_id` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "experience_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("experience_id") ON DELETE CASCADE ON UPDATE NO ACTION;
