/*
  Warnings:

  - The values [what_scratch,what_skip] on the enum `PlanningPages` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `competitorsMatrix` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `keyMessages` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `strongPoints` on the `competitor_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `desire_1` on the `desire_organization` table. All the data in the column will be lost.
  - You are about to drop the column `desire_2` on the `desire_organization` table. All the data in the column will be lost.
  - You are about to drop the column `competitors` on the `pdca_session` table. All the data in the column will be lost.
  - You are about to drop the column `keyword` on the `pdca_session` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `pdca_session` table. All the data in the column will be lost.
  - You are about to drop the column `direction` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `direction_ja` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `direction_reason` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `one_line_promise` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `outcome_description` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `pattern_number` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `process_description` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `quadrant` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `quadrant_ja` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `source_tobe_ids` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the column `source_value_ids` on the `positioning_patterns` table. All the data in the column will be lost.
  - You are about to drop the `PlanningVariants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cta` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cta_tags` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key_message_tags` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strong_points_tags` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `competitor_matrix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `action` to the `desire_organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desire` to the `desire_organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `new_assumption` to the `desire_organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `old_assumption` to the `desire_organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emotional_value` to the `positioning_patterns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `functional_value` to the `positioning_patterns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `one_liner` to the `positioning_patterns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pattern_label` to the `positioning_patterns` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompetitorMatrixType" AS ENUM ('user', 'suggestion', 'competitor');

-- AlterEnum
BEGIN;
CREATE TYPE "PlanningPages_new" AS ENUM ('selection', 'what', 'how', 'generation');
ALTER TABLE "pdca_session" ALTER COLUMN "lastPage" TYPE "PlanningPages_new" USING ("lastPage"::text::"PlanningPages_new");
ALTER TYPE "PlanningPages" RENAME TO "PlanningPages_old";
ALTER TYPE "PlanningPages_new" RENAME TO "PlanningPages";
DROP TYPE "public"."PlanningPages_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "PlanningVariants" DROP CONSTRAINT "PlanningVariants_pdca_session_id_fkey";

-- AlterTable
ALTER TABLE "competitor_matrix" DROP COLUMN "competitorsMatrix",
DROP COLUMN "keyMessages",
DROP COLUMN "strongPoints",
ADD COLUMN     "cta" TEXT NOT NULL,
ADD COLUMN     "cta_tags" JSONB NOT NULL,
ADD COLUMN     "key_message" TEXT,
ADD COLUMN     "key_message_tags" JSONB NOT NULL,
ADD COLUMN     "strong_points" TEXT[],
ADD COLUMN     "strong_points_tags" JSONB NOT NULL,
ADD COLUMN     "type" "CompetitorMatrixType" NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "desire_organization" DROP COLUMN "desire_1",
DROP COLUMN "desire_2",
ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "desire" TEXT NOT NULL,
ADD COLUMN     "new_assumption" TEXT NOT NULL,
ADD COLUMN     "old_assumption" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pdca_session" DROP COLUMN "competitors",
DROP COLUMN "keyword",
DROP COLUMN "product",
ADD COLUMN     "keywords" JSONB;

-- AlterTable
ALTER TABLE "positioning_patterns" DROP COLUMN "direction",
DROP COLUMN "direction_ja",
DROP COLUMN "direction_reason",
DROP COLUMN "one_line_promise",
DROP COLUMN "outcome_description",
DROP COLUMN "pattern_number",
DROP COLUMN "process_description",
DROP COLUMN "quadrant",
DROP COLUMN "quadrant_ja",
DROP COLUMN "source_tobe_ids",
DROP COLUMN "source_value_ids",
ADD COLUMN     "emotional_value" JSONB NOT NULL,
ADD COLUMN     "functional_value" JSONB NOT NULL,
ADD COLUMN     "one_liner" TEXT NOT NULL,
ADD COLUMN     "pattern_label" TEXT NOT NULL;

-- DropTable
DROP TABLE "PlanningVariants";

-- CreateTable
CREATE TABLE "planning_how" (
    "id" TEXT NOT NULL,
    "video_duration" INTEGER,
    "selected_data_rows" JSONB NOT NULL,
    "selected_finalized_rows" JSONB NOT NULL,
    "logo" TEXT,
    "ratio" TEXT,
    "bgm" TEXT,
    "gender" TEXT,
    "main_color" TEXT,
    "cta_color" TEXT,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "planning_how_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planning_what" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "selected_keyword" TEXT,
    "selected_keyVisual" TEXT[],
    "selected_competitor_matrix" TEXT,
    "selected_value_organization" TEXT[],
    "selected_desire_tobe_organization" TEXT[],
    "selected_positioning_patterns" TEXT[],
    "pdca_session_id" TEXT NOT NULL,
    "competitor_urls" TEXT[],

    CONSTRAINT "planning_what_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_visual" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "screenshot_url" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "key_visual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "planning_how_pdca_session_id_key" ON "planning_how"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "planning_what_pdca_session_id_key" ON "planning_what"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "key_visual_pdca_session_id_key" ON "key_visual"("pdca_session_id");

-- AddForeignKey
ALTER TABLE "planning_how" ADD CONSTRAINT "planning_how_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_what" ADD CONSTRAINT "planning_what_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_visual" ADD CONSTRAINT "key_visual_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
