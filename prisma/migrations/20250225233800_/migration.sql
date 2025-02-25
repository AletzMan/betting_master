/*
  Warnings:

  - You are about to drop the column `away` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `home` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `seasson` on the `Match` table. All the data in the column will be lost.
  - Added the required column `awayTeam` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeam` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchDayId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "away",
DROP COLUMN "day",
DROP COLUMN "home",
DROP COLUMN "seasson",
ADD COLUMN     "awayTeam" TEXT NOT NULL,
ADD COLUMN     "homeTeam" TEXT NOT NULL,
ADD COLUMN     "matchDayId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MatchDay" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "matches" TEXT[],
    "season" TEXT NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "MatchDay_pkey" PRIMARY KEY ("id")
);
