/*
  Warnings:

  - You are about to drop the `ReadArticles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReadArticles" DROP CONSTRAINT "ReadArticles_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ReadArticles" DROP CONSTRAINT "ReadArticles_authorId_fkey";

-- DropTable
DROP TABLE "ReadArticles";

-- CreateTable
CREATE TABLE "BookMarkedArticle" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "BookMarkedArticle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookMarkedArticle" ADD CONSTRAINT "BookMarkedArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMarkedArticle" ADD CONSTRAINT "BookMarkedArticle_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
