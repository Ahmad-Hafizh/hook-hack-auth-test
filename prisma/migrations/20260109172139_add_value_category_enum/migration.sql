/*
  Warnings:

  - Added the required column `value_id` to the `value_organization` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `value_organization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ValueOrganizationCategory" AS ENUM ('people', 'things', 'information', 'vibes');

-- AlterTable
ALTER TABLE "value_organization" ADD COLUMN     "value_id" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "ValueOrganizationCategory" NOT NULL;
