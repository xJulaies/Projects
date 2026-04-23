/*
  Warnings:

  - Added the required column `authorUsername` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorUsername` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "authorUsername" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorUsername" TEXT NOT NULL;
