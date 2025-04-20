/*
  Warnings:

  - You are about to drop the column `preferredContact` on the `AdoptionApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdoptionApplication" DROP COLUMN "preferredContact",
ALTER COLUMN "hasPetExperience" SET DATA TYPE TEXT,
ALTER COLUMN "hasOtherPets" SET DATA TYPE TEXT;
