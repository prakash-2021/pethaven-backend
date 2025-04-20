-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- CreateTable
CREATE TABLE "AdoptionApplication" (
    "applicationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "hasPetExperience" BOOLEAN NOT NULL,
    "homeType" TEXT NOT NULL,
    "hasOtherPets" BOOLEAN NOT NULL,
    "preferredContact" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdoptionApplication_pkey" PRIMARY KEY ("applicationId")
);

-- AddForeignKey
ALTER TABLE "AdoptionApplication" ADD CONSTRAINT "AdoptionApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionApplication" ADD CONSTRAINT "AdoptionApplication_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("petId") ON DELETE CASCADE ON UPDATE CASCADE;
