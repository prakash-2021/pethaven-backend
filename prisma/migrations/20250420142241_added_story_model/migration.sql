/*
  Warnings:

  - The values [PENDING] on the enum `AdoptionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdoptionStatus_new" AS ENUM ('AVAILABLE', 'ADOPTED');
ALTER TABLE "Pet" ALTER COLUMN "adoptionStatus" TYPE "AdoptionStatus_new" USING ("adoptionStatus"::text::"AdoptionStatus_new");
ALTER TYPE "AdoptionStatus" RENAME TO "AdoptionStatus_old";
ALTER TYPE "AdoptionStatus_new" RENAME TO "AdoptionStatus";
DROP TYPE "AdoptionStatus_old";
COMMIT;

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
