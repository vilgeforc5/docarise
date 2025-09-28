-- CreateEnum
CREATE TYPE "public"."CrawlStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'FINISHED', 'ERROR');

-- CreateTable
CREATE TABLE "public"."CrawlJob" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "public"."CrawlStatus" NOT NULL DEFAULT 'PENDING',
    "errorMsg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CrawlJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CrawlPage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "public"."CrawlStatus" NOT NULL DEFAULT 'PENDING',
    "error_msg" TEXT,
    "contentHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "crawlJobId" TEXT NOT NULL,

    CONSTRAINT "CrawlPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PageChunk" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "crawlPageId" TEXT NOT NULL,

    CONSTRAINT "PageChunk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CrawlPage" ADD CONSTRAINT "CrawlPage_crawlJobId_fkey" FOREIGN KEY ("crawlJobId") REFERENCES "public"."CrawlJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PageChunk" ADD CONSTRAINT "PageChunk_crawlPageId_fkey" FOREIGN KEY ("crawlPageId") REFERENCES "public"."CrawlPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
