/*
  Warnings:

  - Added the required column `competitorsMatrix` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "competitor_matrix" ADD COLUMN     "competitorsMatrix" JSONB NOT NULL;
