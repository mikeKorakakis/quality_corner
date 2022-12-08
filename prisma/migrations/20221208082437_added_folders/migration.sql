/*
  Warnings:

  - You are about to drop the column `folder` on the `Book` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "category1" TEXT,
    "category2" TEXT,
    "folderId" INTEGER,
    "fileUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Book_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("category1", "category2", "createdAt", "description", "fileUrl", "id", "title", "updatedAt") SELECT "category1", "category2", "createdAt", "description", "fileUrl", "id", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_fileUrl_key" ON "Book"("fileUrl");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
