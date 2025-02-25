/*
  Warnings:

  - You are about to drop the column `matchDayId` on the `Match` table. All the data in the column will be lost.
  - Added the required column `matchDay` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "matchDayId",
ADD COLUMN     "matchDay" INTEGER NOT NULL;
