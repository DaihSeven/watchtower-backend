/*
  Warnings:

  - Changed the type of `tipo_usuario` on the `usuarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('admin', 'usuario');

-- AlterTable
ALTER TABLE "pessoas_desaparecidas" ADD COLUMN     "imagem_url" TEXT;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "tipo_usuario",
ADD COLUMN     "tipo_usuario" "TipoUsuario" NOT NULL;
