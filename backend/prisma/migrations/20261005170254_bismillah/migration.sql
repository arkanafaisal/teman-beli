-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityComment" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_title_key" ON "Community"("title");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityLike_userId_communityId_key" ON "CommunityLike"("userId", "communityId");

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityComment" ADD CONSTRAINT "CommunityComment_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityLike" ADD CONSTRAINT "CommunityLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityLike" ADD CONSTRAINT "CommunityLike_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
