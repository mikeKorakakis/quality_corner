/*
  Warnings:

  - Made the column `folderId` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Folder` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "category1" TEXT,
    "category2" TEXT,
    "folderId" INTEGER NOT NULL,
    "fileUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Book_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("category1", "category2", "createdAt", "description", "fileUrl", "folderId", "id", "title", "updatedAt") SELECT "category1", "category2", "createdAt", "description", "fileUrl", "folderId", "id", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_fileUrl_key" ON "Book"("fileUrl");
CREATE TABLE "new_Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Folder" ("description", "id", "name", "private") SELECT "description", "id", "name", "private" FROM "Folder";
DROP TABLE "Folder";
ALTER TABLE "new_Folder" RENAME TO "Folder";
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
