-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('GOODIDEA', 'THANKS', 'WOW', 'HAHA', 'LOVE');

-- CreateTable
CREATE TABLE "ImagePost" (
    "img_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "description" TEXT,
    "reactions" "ReactionType"[] DEFAULT ARRAY[]::"ReactionType"[],
    "gg_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImagePost_pkey" PRIMARY KEY ("img_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "cmt_id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gg_id" UUID NOT NULL,
    "img_id" UUID NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("cmt_id")
);

-- AddForeignKey
ALTER TABLE "ImagePost" ADD CONSTRAINT "ImagePost_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_img_id_fkey" FOREIGN KEY ("img_id") REFERENCES "ImagePost"("img_id") ON DELETE CASCADE ON UPDATE CASCADE;
