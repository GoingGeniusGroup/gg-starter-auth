-- AlterTable
ALTER TABLE "avatar" ADD COLUMN     "isactive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "visitprofile" (
    "visit_id" UUID NOT NULL,
    "gg_id" UUID NOT NULL,
    "visit_by" TEXT,
    "type" "ReactionType",
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visitprofile_pkey" PRIMARY KEY ("visit_id")
);

-- AddForeignKey
ALTER TABLE "visitprofile" ADD CONSTRAINT "visitprofile_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;
