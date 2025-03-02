/*
  Warnings:

  - Made the column `userInfoId` on table `Bet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Bet" DROP CONSTRAINT "Bet_userInfoId_fkey";

-- DropIndex
DROP INDEX "Bet_userInfoId_key";

-- AlterTable
ALTER TABLE "Bet" ALTER COLUMN "userInfoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
