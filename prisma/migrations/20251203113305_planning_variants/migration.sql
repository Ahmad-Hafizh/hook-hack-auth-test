/*
  Warnings:

  - You are about to drop the column `userId` on the `PlanningSession` table. All the data in the column will be lost.
  - Added the required column `bodyAMessage` to the `RenderedVideo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyBMessage` to the `RenderedVideo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyCMessage` to the `RenderedVideo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cta` to the `RenderedVideo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hook` to the `RenderedVideo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlanningSession" DROP CONSTRAINT "PlanningSession_userId_fkey";

-- AlterTable
ALTER TABLE "PlanningSession" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "RenderedVideo" ADD COLUMN     "bodyAMessage" TEXT NOT NULL,
ADD COLUMN     "bodyBMessage" TEXT NOT NULL,
ADD COLUMN     "bodyCMessage" TEXT NOT NULL,
ADD COLUMN     "cta" TEXT NOT NULL,
ADD COLUMN     "hook" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PlanningVariants" (
    "id" BIGSERIAL NOT NULL,
    "hooks" TEXT[],
    "bodyA_messages" TEXT[],
    "bodyB_messages" TEXT[],
    "bodyC_messages" TEXT[],
    "ctas" TEXT[],
    "planningSessionId" TEXT NOT NULL,

    CONSTRAINT "PlanningVariants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanningVariants_planningSessionId_key" ON "PlanningVariants"("planningSessionId");

-- AddForeignKey
ALTER TABLE "PlanningVariants" ADD CONSTRAINT "PlanningVariants_planningSessionId_fkey" FOREIGN KEY ("planningSessionId") REFERENCES "PlanningSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
