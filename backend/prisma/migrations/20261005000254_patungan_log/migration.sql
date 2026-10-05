-- CreateTable
CREATE TABLE "PatunganLog" (
    "id" TEXT NOT NULL,
    "patunganId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PatunganLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PatunganLog" ADD CONSTRAINT "PatunganLog_patunganId_fkey" FOREIGN KEY ("patunganId") REFERENCES "Patungan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
