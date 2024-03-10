-- CreateTable
CREATE TABLE "Je" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "jeID" INTEGER NOT NULL,
    CONSTRAINT "Audit_jeID_fkey" FOREIGN KEY ("jeID") REFERENCES "Je" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileTitle" TEXT NOT NULL,
    "instance" TEXT NOT NULL,
    "fileGroup" TEXT NOT NULL,
    "auditID" INTEGER NOT NULL,
    CONSTRAINT "Requirement_auditID_fkey" FOREIGN KEY ("auditID") REFERENCES "Audit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "path" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FileToRequirement" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FileToRequirement_A_fkey" FOREIGN KEY ("A") REFERENCES "File" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FileToRequirement_B_fkey" FOREIGN KEY ("B") REFERENCES "Requirement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "File_path_key" ON "File"("path");

-- CreateIndex
CREATE UNIQUE INDEX "_FileToRequirement_AB_unique" ON "_FileToRequirement"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToRequirement_B_index" ON "_FileToRequirement"("B");
