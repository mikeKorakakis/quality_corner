-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "category1" TEXT,
    "category2" TEXT,
    "folder" TEXT NOT NULL DEFAULT '',
    "fileUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("category1", "category2", "createdAt", "description", "fileUrl", "id", "title", "updatedAt") SELECT "category1", "category2", "createdAt", "description", "fileUrl", "id", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_fileUrl_key" ON "Book"("fileUrl");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
