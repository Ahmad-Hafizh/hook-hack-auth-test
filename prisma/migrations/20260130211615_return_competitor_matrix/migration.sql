/*
  Warnings:

  - You are about to drop the column `cta` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `cta_tags` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `key_message` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `key_message_tags` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `strong_points` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `strong_points_tags` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `action` on the `desire_organization` table. All the data in the column will be lost.
  - You are about to drop the column `desire` on the `desire_organization` table. All the data in the column will be lost.
  - You are about to drop the column `new_assumption` on the `desire_organization` table. All the data in the column will be lost.
  - You are about to drop the column `old_assumption` on the `desire_organization` table. All the data in the column will be lost.
  - Added the required column `suggestion` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desire_1` to the `desire_organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desire_2` to the `desire_organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "competitor_matrix_pdca_session_id_key";

-- DropIndex
DROP INDEX "desire_organization_pdca_session_id_key";

-- DropIndex
DROP INDEX "positioning_patterns_pdca_session_id_key";

-- DropIndex
DROP INDEX "value_organization_pdca_session_id_key";

-- AlterTable
ALTER TABLE "competitor_matrix" DROP COLUMN "cta",
DROP COLUMN "cta_tags",
DROP COLUMN "key_message",
DROP COLUMN "key_message_tags",
DROP COLUMN "strong_points",
DROP COLUMN "strong_points_tags",
DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "competitor" JSONB[],
ADD COLUMN     "suggestion" JSONB NOT NULL,
ADD COLUMN     "user" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "desire_organization" DROP COLUMN "action",
DROP COLUMN "desire",
DROP COLUMN "new_assumption",
DROP COLUMN "old_assumption",
ADD COLUMN     "desire_1" TEXT NOT NULL,
ADD COLUMN     "desire_2" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CompetitorMatrixType";
