/*
  Warnings:

  - Added the required column `status` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ALTER COLUMN "dateOfBirth" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;
