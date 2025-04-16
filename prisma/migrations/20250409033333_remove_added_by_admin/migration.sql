/*
  Warnings:

  - You are about to drop the column `addedByAdminId` on the `AnswerPetMapping` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnswerPetMapping" DROP CONSTRAINT "AnswerPetMapping_addedByAdminId_fkey";

-- AlterTable
ALTER TABLE "AnswerPetMapping" DROP COLUMN "addedByAdminId";
