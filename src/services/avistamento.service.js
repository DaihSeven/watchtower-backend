import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Buscar todos os avistamentos
export async function getAllAvistamentos() {
  const rows = await prisma.avistamento.findMany();
  return rows;
}

// Criar novo avistamento com userId
export async function createAvistamento(data) {
  const created = await prisma.avistamento.create({
    data: {
      idPessoaDesaparecida: data.idPessoaDesaparecida,
      comentario: data.comentario,
      localAvistamento: data.localAvistamento,
      latitude: data.latitude,
      longitude: data.longitude,
      nomeInformante: data.nomeInformante,
      contatoInformante: data.contatoInformante,
      userId: data.userId, 
    },
  });
  return created;
}

// Deletar um avistamento
export async function deleteAvistamento(id) {
  const existing = await prisma.avistamento.findUnique({
    where: { id: Number(id) },
  });
  if (!existing) return null;

  const del = await prisma.avistamento.delete({ where: { id: Number(id) } });
  return del;
}

// Atualizar um avistamento (não precisa alterar userId, mas mantém o registro)
export async function updateAvistamento(id, data) {
  const updated = await prisma.avistamento.update({
    where: { id: Number(id) },
    data: {
      idPessoaDesaparecida: data.idPessoaDesaparecida,
      comentario: data.comentario,
      localAvistamento: data.localAvistamento,
      latitude: data.latitude,
      longitude: data.longitude,
      nomeInformante: data.nomeInformante,
      contatoInformante: data.contatoInformante,
    },
  });
  return updated;
}
