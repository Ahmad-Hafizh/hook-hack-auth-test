/*
  Warnings:

  - You are about to drop the column `sessionId` on the `PlanningPlan` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `RenderedVideo` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[planningSessionId]` on the table `CreativeBrief` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[planningSessionId]` on the table `PlanningPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `planningSessionId` to the `CreativeBrief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planningSessionId` to the `PlanningPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planningSessionId` to the `RenderedVideo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlanningPages" AS ENUM ('switch', 'what_scratch', 'what_skip', 'how', 'generation');

-- DropForeignKey
ALTER TABLE "PlanningPlan" DROP CONSTRAINT "PlanningPlan_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "RenderedVideo" DROP CONSTRAINT "RenderedVideo_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "CreativeBrief" ADD COLUMN     "planningSessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PlanningPlan" DROP COLUMN "sessionId",
ADD COLUMN     "planningSessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RenderedVideo" DROP COLUMN "sessionId",
ADD COLUMN     "planningSessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- DropTable
DROP TABLE "Session";

-- DropEnum
DROP TYPE "Pages";

-- CreateTable
CREATE TABLE "PlanningSession" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT,
    "finishedAt" TIMESTAMPTZ(6),
    "lastPage" "PlanningPages",
    "lastStep" INTEGER,
    "product" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PlanningSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanningSession_sessionToken_key" ON "PlanningSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "CreativeBrief_planningSessionId_key" ON "CreativeBrief"("planningSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningPlan_planningSessionId_key" ON "PlanningPlan"("planningSessionId");

-- AddForeignKey
ALTER TABLE "PlanningSession" ADD CONSTRAINT "PlanningSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreativeBrief" ADD CONSTRAINT "CreativeBrief_planningSessionId_fkey" FOREIGN KEY ("planningSessionId") REFERENCES "PlanningSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningPlan" ADD CONSTRAINT "PlanningPlan_planningSessionId_fkey" FOREIGN KEY ("planningSessionId") REFERENCES "PlanningSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenderedVideo" ADD CONSTRAINT "RenderedVideo_planningSessionId_fkey" FOREIGN KEY ("planningSessionId") REFERENCES "PlanningSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
