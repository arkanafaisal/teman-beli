-- CreateEnum
CREATE TYPE "PatunganStatus" AS ENUM ('OPEN', 'FULL', 'FINISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Patungan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "targetQuota" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "currentQuota" INTEGER NOT NULL DEFAULT 0,
    "area" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "notes" TEXT,
    "refLink" TEXT,
    "status" "PatunganStatus" NOT NULL DEFAULT 'OPEN',
    "hostId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patungan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatunganParticipant" (
    "id" TEXT NOT NULL,
    "patunganId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quota" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatunganParticipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Patungan" ADD CONSTRAINT "Patungan_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatunganParticipant" ADD CONSTRAINT "PatunganParticipant_patunganId_fkey" FOREIGN KEY ("patunganId") REFERENCES "Patungan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatunganParticipant" ADD CONSTRAINT "PatunganParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
