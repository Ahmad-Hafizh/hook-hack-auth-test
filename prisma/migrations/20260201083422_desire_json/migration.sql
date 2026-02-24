/*
  Warnings:

  - Changed the type of `desire_1` on the `desire_organization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `desire_2` on the `desire_organization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "desire_organization" DROP COLUMN "desire_1",
ADD COLUMN     "desire_1" JSONB NOT NULL,
DROP COLUMN "desire_2",
ADD COLUMN     "desire_2" JSONB NOT NULL;
