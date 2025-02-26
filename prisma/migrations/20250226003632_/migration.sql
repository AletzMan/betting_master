/*
  Warnings:

  - You are about to drop the column `name` on the `MatchDay` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchDay" DROP COLUMN "name",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isFinishGame" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "results" TEXT[] DEFAULT ARRAY['-', '-', '-', '-', '-', '-', '-', '-', '-']::TEXT[];
