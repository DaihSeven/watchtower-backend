-- AlterTable
ALTER TABLE "Contato" ADD COLUMN     "pessoaId" TEXT;

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
