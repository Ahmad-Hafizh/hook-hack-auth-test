/*
  Warnings:

  - The values [cancelled] on the enum `PDCAStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `keywords` on the `pdca_session` table. All the data in the column will be lost.
  - The `hypotesis` column on the `pdca_session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `DataRow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DataRowFinalized` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `competitor_candidates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `competitor_matrix` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `desire_organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `key_visual` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `positioning_patterns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `value_organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PDCAStatus_new" AS ENUM ('in_progress', 'running', 'completed', 'deleted');
ALTER TABLE "public"."pdca_session" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "pdca_session" ALTER COLUMN "status" TYPE "PDCAStatus_new" USING ("status"::text::"PDCAStatus_new");
ALTER TYPE "PDCAStatus" RENAME TO "PDCAStatus_old";
ALTER TYPE "PDCAStatus_new" RENAME TO "PDCAStatus";
DROP TYPE "public"."PDCAStatus_old";
ALTER TABLE "pdca_session" ALTER COLUMN "status" SET DEFAULT 'in_progress';
COMMIT;

-- DropForeignKey
ALTER TABLE "DataRow" DROP CONSTRAINT "DataRow_pdca_session_id_fkey";

-- DropForeignKey
ALTER TABLE "DataRowFinalized" DROP CONSTRAINT "DataRowFinalized_pdca_session_id_fkey";

-- DropForeignKey
ALTER TABLE "competitor_candidates" DROP CONSTRAINT "competitor_candidates_pdca_session_id_fkey";

-- DropForeignKey
ALTER TABLE "competitor_matrix" DROP CONSTRAINT "competitor_matrix_pdca_session_id_fkey";

-- DropForeignKey
ALTER TABLE "desire_organization" DROP CONSTRAINT "desire_organization_pdca_session_id_fkey";

-- DropForeignKey
ALTER TABLE "key_visual" DROP CONSTRAINT "key_visual_pdca_session_id_fkey";

-- DropForeignKey
ALTER TABLE "positioning_patterns" DROP CONSTRAINT "positioning_patterns_pdca_session_id_fkey";

-- DropForeignKey
ALTER TABLE "value_organization" DROP CONSTRAINT "value_organization_pdca_session_id_fkey";

-- AlterTable
ALTER TABLE "pdca_session" DROP COLUMN "keywords",
ADD COLUMN     "deletedAt" TIMESTAMPTZ(6),
DROP COLUMN "hypotesis",
ADD COLUMN     "hypotesis" JSONB;

-- DropTable
DROP TABLE "DataRow";

-- DropTable
DROP TABLE "DataRowFinalized";

-- DropTable
DROP TABLE "competitor_candidates";

-- DropTable
DROP TABLE "competitor_matrix";

-- DropTable
DROP TABLE "desire_organization";

-- DropTable
DROP TABLE "key_visual";

-- DropTable
DROP TABLE "positioning_patterns";

-- DropTable
DROP TABLE "value_organization";
