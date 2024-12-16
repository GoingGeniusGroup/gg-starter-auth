-- CreateEnum
CREATE TYPE "socialType" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'GITHUB', 'STEAM', 'LINKDN', 'GOOGLE');

-- CreateTable
CREATE TABLE "social" (
    "social_id" UUID NOT NULL,
    "key" "socialType" NOT NULL,
    "value" TEXT NOT NULL,
    "gg_id" UUID NOT NULL,

    CONSTRAINT "social_pkey" PRIMARY KEY ("social_id")
);

-- AddForeignKey
ALTER TABLE "social" ADD CONSTRAINT "social_gg_id_fkey" FOREIGN KEY ("gg_id") REFERENCES "User"("gg_id") ON DELETE CASCADE ON UPDATE NO ACTION;
