-- CreateEnum
CREATE TYPE "Pages" AS ENUM ('switch', 'what', 'how', 'generation');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "tiktokUsername" TEXT,
    "credit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "V2_format" (
    "system_status" TEXT NOT NULL DEFAULT '',
    "search_url" TEXT DEFAULT '',
    "scraping_brand" TEXT DEFAULT '',
    "scraping_industry" TEXT DEFAULT '',
    "scraping_caption" TEXT DEFAULT '',
    "scraping_landingpage" TEXT DEFAULT '',
    "scraping_likes" BIGINT,
    "scraping_comments" BIGINT,
    "scraping_shares" BIGINT,
    "scraping_ctr" BIGINT,
    "scraping_budget" TEXT DEFAULT '',
    "scraping_ctr_top" BIGINT,
    "scraping_ctr_sec" JSON,
    "scraping_cvr_top" BIGINT,
    "scraping_cvr_sec" JSON,
    "system_id" BIGSERIAL NOT NULL,
    "search_condition" TEXT DEFAULT '',
    "video_product_category" TEXT DEFAULT '',
    "video_product_details" TEXT DEFAULT '',
    "video_target_age" TEXT DEFAULT '',
    "video_target_gender" TEXT DEFAULT '',
    "video_content_type" TEXT DEFAULT '',
    "video_content_summary" TEXT DEFAULT '',
    "video_content_music" TEXT DEFAULT '',
    "video_content_speed" TEXT DEFAULT '',
    "video_target_details" TEXT DEFAULT '',
    "system_usable" BOOLEAN,
    "video_url" TEXT DEFAULT '',

    CONSTRAINT "V2_format_pkey" PRIMARY KEY ("system_id")
);

-- CreateTable
CREATE TABLE "requestlist" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "company_name" TEXT,
    "email" TEXT,
    "tiktok_url" TEXT,

    CONSTRAINT "requestlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "system_userid" TEXT NOT NULL,
    "system_createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userinput" JSON,
    "comment" JSON,
    "hook" JSON,
    "hook_count" SMALLINT,
    "content" JSON,
    "content_count" SMALLINT,
    "id" BIGSERIAL NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT,
    "finishedAt" TIMESTAMPTZ(6),
    "lastPage" "Pages",
    "lastStep" INTEGER,
    "product" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreativeBrief" (
    "id" BIGSERIAL NOT NULL,
    "keyMessages" TEXT,
    "strongPoints" TEXT[],

    CONSTRAINT "CreativeBrief_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanningPlan" (
    "id" BIGSERIAL NOT NULL,
    "currency" TEXT,
    "estimated_cost_per_video" INTEGER,
    "recommended_min_spend_per_video" INTEGER,
    "test_term_weeks" INTEGER,
    "videos_per_month" INTEGER,
    "platform" TEXT,
    "target_impressions_per_video" INTEGER,
    "typical_cpm" INTEGER,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "PlanningPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RenderedVideo" (
    "id" BIGSERIAL NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "RenderedVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "project_id_key" ON "project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_stripeSessionId_key" ON "Transaction"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_system_userid_fkey" FOREIGN KEY ("system_userid") REFERENCES "User"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningPlan" ADD CONSTRAINT "PlanningPlan_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenderedVideo" ADD CONSTRAINT "RenderedVideo_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
