-- CreateTable
CREATE TABLE "value_organization" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "rationale" TEXT NOT NULL,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "value_organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desire_organization" (
    "id" TEXT NOT NULL,
    "value_id" TEXT NOT NULL,
    "value_category" TEXT NOT NULL,
    "value_label" TEXT NOT NULL,
    "desire_1" JSONB NOT NULL,
    "desire_2" JSONB NOT NULL,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "desire_organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positioning_patterns" (
    "id" TEXT NOT NULL,
    "pattern_number" INTEGER NOT NULL,
    "quadrant" TEXT NOT NULL,
    "quadrant_ja" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "direction_ja" TEXT NOT NULL,
    "direction_reason" TEXT NOT NULL,
    "process_description" TEXT NOT NULL,
    "outcome_description" TEXT NOT NULL,
    "one_line_promise" TEXT NOT NULL,
    "source_value_ids" TEXT[],
    "source_tobe_ids" TEXT[],
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "positioning_patterns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "value_organization_pdca_session_id_key" ON "value_organization"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "desire_organization_pdca_session_id_key" ON "desire_organization"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "positioning_patterns_pdca_session_id_key" ON "positioning_patterns"("pdca_session_id");

-- AddForeignKey
ALTER TABLE "value_organization" ADD CONSTRAINT "value_organization_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desire_organization" ADD CONSTRAINT "desire_organization_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positioning_patterns" ADD CONSTRAINT "positioning_patterns_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
