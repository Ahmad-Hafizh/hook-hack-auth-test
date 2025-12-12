/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `userId` to the `PlanningSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RenderedVideo" DROP CONSTRAINT "RenderedVideo_planningSessionId_fkey";

-- AlterTable
ALTER TABLE "PlanningSession" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Ads" (
    "id" BIGSERIAL NOT NULL,
    "adUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "performance" JSON,
    "planningSessionId" TEXT NOT NULL,

    CONSTRAINT "Ads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanningSession" ADD CONSTRAINT "PlanningSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenderedVideo" ADD CONSTRAINT "RenderedVideo_planningSessionId_fkey" FOREIGN KEY ("planningSessionId") REFERENCES "PlanningSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ads" ADD CONSTRAINT "Ads_planningSessionId_fkey" FOREIGN KEY ("planningSessionId") REFERENCES "PlanningSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
