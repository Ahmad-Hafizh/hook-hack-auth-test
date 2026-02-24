/*
  Warnings:

  - A unique constraint covering the columns `[pdca_session_id]` on the table `competitor_matrix` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "competitor_matrix_pdca_session_id_key" ON "competitor_matrix"("pdca_session_id");
