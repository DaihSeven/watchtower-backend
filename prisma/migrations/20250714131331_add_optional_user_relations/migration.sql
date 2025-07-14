-- AlterTable
ALTER TABLE "Contato" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "avistamentos" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "pessoas_desaparecidas" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "avistamentos" ADD CONSTRAINT "avistamentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoas_desaparecidas" ADD CONSTRAINT "pessoas_desaparecidas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
