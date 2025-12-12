/*
  Warnings:

  - The primary key for the `Ads` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CreativeBrief` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PlanningPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PlanningVariants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RenderedVideo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Ads" DROP CONSTRAINT "Ads_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ads_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ads_id_seq";

-- AlterTable
ALTER TABLE "CreativeBrief" DROP CONSTRAINT "CreativeBrief_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CreativeBrief_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CreativeBrief_id_seq";

-- AlterTable
ALTER TABLE "PlanningPlan" DROP CONSTRAINT "PlanningPlan_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlanningPlan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PlanningPlan_id_seq";

-- AlterTable
ALTER TABLE "PlanningSession" ADD COLUMN     "competitors" TEXT[],
ADD COLUMN     "keyword" TEXT;

-- AlterTable
ALTER TABLE "PlanningVariants" DROP CONSTRAINT "PlanningVariants_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlanningVariants_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PlanningVariants_id_seq";

-- AlterTable
ALTER TABLE "RenderedVideo" DROP CONSTRAINT "RenderedVideo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RenderedVideo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RenderedVideo_id_seq";

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaction_id_seq";
