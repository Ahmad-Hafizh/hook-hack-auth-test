-- CreateTable
CREATE TABLE "competitor_candidates_new" (
    "id" TEXT NOT NULL,
    "candidates" JSONB,
    "meta_description" JSONB,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "competitor_candidates_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitive_matrixes_new" (
    "id" TEXT NOT NULL,
    "competitor" JSONB[],
    "suggestion" JSONB,
    "user" JSONB,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "competitive_matrixes_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "value_organizations_new" (
    "id" TEXT NOT NULL,
    "value_organizations" JSONB,
    "meta" JSONB,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "value_organizations_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desire_organizations_new" (
    "id" TEXT NOT NULL,
    "desire_organizations" JSONB,
    "meta" JSONB,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "desire_organizations_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positioning_patterns_new" (
    "id" TEXT NOT NULL,
    "positioning_patterns" JSONB,
    "meta" JSONB,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "positioning_patterns_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_row_new" (
    "id" TEXT NOT NULL,
    "data_rows" JSONB,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "data_row_new_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_row_finalized_new" (
    "id" TEXT NOT NULL,
    "data_rows_finalized" JSONB,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "data_row_finalized_new_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "competitor_candidates_new_pdca_session_id_key" ON "competitor_candidates_new"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "competitive_matrixes_new_pdca_session_id_key" ON "competitive_matrixes_new"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "value_organizations_new_pdca_session_id_key" ON "value_organizations_new"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "desire_organizations_new_pdca_session_id_key" ON "desire_organizations_new"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "positioning_patterns_new_pdca_session_id_key" ON "positioning_patterns_new"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "data_row_new_pdca_session_id_key" ON "data_row_new"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "data_row_finalized_new_pdca_session_id_key" ON "data_row_finalized_new"("pdca_session_id");

-- AddForeignKey
ALTER TABLE "competitor_candidates_new" ADD CONSTRAINT "competitor_candidates_new_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitive_matrixes_new" ADD CONSTRAINT "competitive_matrixes_new_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "value_organizations_new" ADD CONSTRAINT "value_organizations_new_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desire_organizations_new" ADD CONSTRAINT "desire_organizations_new_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positioning_patterns_new" ADD CONSTRAINT "positioning_patterns_new_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_row_new" ADD CONSTRAINT "data_row_new_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_row_finalized_new" ADD CONSTRAINT "data_row_finalized_new_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
