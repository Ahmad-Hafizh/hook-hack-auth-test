/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `key_visual` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "key_visual_pdca_session_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "key_visual_url_key" ON "key_visual"("url");
