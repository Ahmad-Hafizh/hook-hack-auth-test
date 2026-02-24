-- AlterEnum
ALTER TYPE "PlanningPages" ADD VALUE 'what';

-- AlterTable
ALTER TABLE "pdca_session" ADD COLUMN     "isChoosingSpeed" BOOLEAN DEFAULT false,
ADD COLUMN     "isHavingCompetitorUrls" BOOLEAN DEFAULT false;
