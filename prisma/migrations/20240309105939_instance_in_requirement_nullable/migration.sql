-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Requirement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileTitle" TEXT NOT NULL,
    "instance" TEXT,
    "fileGroup" TEXT NOT NULL,
    "auditId" INTEGER NOT NULL,
    CONSTRAINT "Requirement_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Requirement" ("auditId", "fileGroup", "fileTitle", "id", "instance") SELECT "auditId", "fileGroup", "fileTitle", "id", "instance" FROM "Requirement";
DROP TABLE "Requirement";
ALTER TABLE "new_Requirement" RENAME TO "Requirement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
