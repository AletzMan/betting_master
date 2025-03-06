-- DropForeignKey
ALTER TABLE "Bet" DROP CONSTRAINT "Bet_userInfoId_fkey";

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
