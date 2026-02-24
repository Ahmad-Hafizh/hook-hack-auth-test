-- AlterTable
ALTER TABLE "pdca" ADD COLUMN     "description" TEXT,
ADD COLUMN     "memo" TEXT,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "pdca_session" ADD COLUMN     "hypotesis" TEXT,
ADD COLUMN     "memo" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "status" TEXT;
