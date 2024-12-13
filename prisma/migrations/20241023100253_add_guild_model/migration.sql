-- CreateTable
CREATE TABLE "guilds" (
    "description" TEXT,
    "guild_name" TEXT,
    "avatar_img" TEXT,
    "continent" TEXT,
    "skills" TEXT[],
    "additionalSkills" TEXT[],
    "symbol" TEXT,
    "color" TEXT,
    "alignment" TEXT[],
    "id" UUID NOT NULL,
    "element" TEXT,
    "faculty" JSONB[],
    "guild_frame" TEXT,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_guild_name_key" ON "guilds"("guild_name");
