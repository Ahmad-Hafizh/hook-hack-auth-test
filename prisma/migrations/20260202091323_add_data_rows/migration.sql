-- CreateTable
CREATE TABLE "DataRow" (
    "id" TEXT NOT NULL,
    "hook" JSONB NOT NULL,
    "body1" JSONB NOT NULL,
    "body2" JSONB NOT NULL,
    "cta" JSONB NOT NULL,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "DataRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataRowFinalized" (
    "id" TEXT NOT NULL,
    "hookImage" TEXT NOT NULL,
    "hookPart1" TEXT NOT NULL,
    "hookPart2" TEXT NOT NULL,
    "body1Image" TEXT NOT NULL,
    "body1ImageB" TEXT,
    "body1Part1" TEXT NOT NULL,
    "body1Part2" TEXT NOT NULL,
    "body2Image" TEXT NOT NULL,
    "body2ImageB" TEXT,
    "body2Part1" TEXT NOT NULL,
    "body2Part2" TEXT NOT NULL,
    "ctaPart1" TEXT NOT NULL,
    "ctaPart2" TEXT NOT NULL,
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "DataRowFinalized_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataRow" ADD CONSTRAINT "DataRow_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataRowFinalized" ADD CONSTRAINT "DataRowFinalized_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
