/*
  Warnings:

  - You are about to drop the column `betId` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_betId_fkey";

-- DropIndex
DROP INDEX "User_uid_key";

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "predictionIds" TEXT[];

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "betId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uid";
