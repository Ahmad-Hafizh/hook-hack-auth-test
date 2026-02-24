-- AlterTable
ALTER TABLE "planning_how" ADD COLUMN     "bg_image_provider" TEXT,
ADD COLUMN     "point_of_view" TEXT,
ADD COLUMN     "tone" TEXT;

-- AlterTable
ALTER TABLE "planning_what" ADD COLUMN     "selected_competitor_candidates" TEXT[];

-- CreateTable
CREATE TABLE "competitor_candidates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "head_company" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "hero_text" JSONB NOT NULL,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "competitor_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "competitor_candidates_pdca_session_id_key" ON "competitor_candidates"("pdca_session_id");

-- AddForeignKey
ALTER TABLE "competitor_candidates" ADD CONSTRAINT "competitor_candidates_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
