/*
  Warnings:

  - A unique constraint covering the columns `[fileUrl]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_fileUrl_key" ON "Book"("fileUrl");
