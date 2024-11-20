/*
  Warnings:

  - Added the required column `userId` to the `Artikel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artikel" ADD COLUMN     "userId" TEXT NOT NULL;
