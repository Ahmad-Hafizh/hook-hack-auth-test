/*
  Warnings:

  - The `category` column on the `value_organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "value_organization" ALTER COLUMN "label" DROP NOT NULL,
ALTER COLUMN "rationale" DROP NOT NULL,
ALTER COLUMN "value_id" DROP NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT;
