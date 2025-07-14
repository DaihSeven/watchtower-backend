/*
  Warnings:

  - Made the column `userId` on table `Contato` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `avistamentos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `pessoas_desaparecidas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Contato" DROP CONSTRAINT "Contato_userId_fkey";

-- DropForeignKey
ALTER TABLE "avistamentos" DROP CONSTRAINT "avistamentos_userId_fkey";

-- DropForeignKey
ALTER TABLE "pessoas_desaparecidas" DROP CONSTRAINT "pessoas_desaparecidas_userId_fkey";

-- AlterTable
ALTER TABLE "Contato" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "avistamentos" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "pessoas_desaparecidas" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "avistamentos" ADD CONSTRAINT "avistamentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoas_desaparecidas" ADD CONSTRAINT "pessoas_desaparecidas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
