-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Folder" ("description", "id", "name", "private") SELECT "description", "id", "name", "private" FROM "Folder";
DROP TABLE "Folder";
ALTER TABLE "new_Folder" RENAME TO "Folder";
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
