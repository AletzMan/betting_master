/*
  Warnings:

  - The `prediction` column on the `Prediction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "prediction",
ADD COLUMN     "prediction" TEXT[];
