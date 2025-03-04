/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matchNumber` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "matchNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_id_key" ON "Prediction"("id");
