/*
  Warnings:

  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Folder` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "File_path_key";

-- DropIndex
DROP INDEX "Folder_path_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "path";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "path";
