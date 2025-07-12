/*
  Warnings:

  - You are about to drop the column `pessoaId` on the `Contato` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contato" DROP CONSTRAINT "Contato_pessoaId_fkey";

-- AlterTable
ALTER TABLE "Contato" DROP COLUMN "pessoaId";
