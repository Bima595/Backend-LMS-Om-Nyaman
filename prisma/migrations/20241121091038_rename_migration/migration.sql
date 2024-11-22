/*
  Warnings:

  - You are about to drop the column `userId` on the `tugas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tugas" DROP CONSTRAINT "tugas_userId_fkey";

-- AlterTable
ALTER TABLE "tugas" DROP COLUMN "userId";
