/*
  Warnings:

  - You are about to drop the column `jeID` on the `Audit` table. All the data in the column will be lost.
  - You are about to drop the column `auditID` on the `Requirement` table. All the data in the column will be lost.
  - Added the required column `jeId` to the `Audit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auditId` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "jeId" INTEGER NOT NULL,
    CONSTRAINT "Audit_jeId_fkey" FOREIGN KEY ("jeId") REFERENCES "Je" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Audit" ("date", "id", "name") SELECT "date", "id", "name" FROM "Audit";
DROP TABLE "Audit";
ALTER TABLE "new_Audit" RENAME TO "Audit";
CREATE TABLE "new_Requirement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileTitle" TEXT NOT NULL,
    "instance" TEXT NOT NULL,
    "fileGroup" TEXT NOT NULL,
    "auditId" INTEGER NOT NULL,
    CONSTRAINT "Requirement_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Requirement" ("fileGroup", "fileTitle", "id", "instance") SELECT "fileGroup", "fileTitle", "id", "instance" FROM "Requirement";
DROP TABLE "Requirement";
ALTER TABLE "new_Requirement" RENAME TO "Requirement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
