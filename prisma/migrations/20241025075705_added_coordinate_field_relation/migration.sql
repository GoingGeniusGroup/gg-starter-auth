-- DropForeignKey
ALTER TABLE "coordinate" DROP CONSTRAINT "coordinate_id_fkey";

-- AddForeignKey
ALTER TABLE "coordinate" ADD CONSTRAINT "coordinate_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;
