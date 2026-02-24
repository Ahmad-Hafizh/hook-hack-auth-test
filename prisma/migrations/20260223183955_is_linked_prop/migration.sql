/*
  Warnings:

  - You are about to drop the column `first_time_login` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "first_time_login",
ADD COLUMN     "isLinkedWithGoogleAds" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLinkedWithMCC" BOOLEAN NOT NULL DEFAULT false;
