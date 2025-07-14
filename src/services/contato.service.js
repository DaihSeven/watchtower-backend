import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const adicionarContato = async (dados) => {
  return await prisma.contato.create({
    data: {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      mensagem: dados.mensagem,
      userId: dados.userId,
    },
  });
};

export const listarTodos = async () => {
  return await prisma.contato.findMany();
};

export const buscarPorId = async (id) => {
  return await prisma.contato.findUnique({
    where: { id },
  });
};

export const atualizar = async (id, novosDados) => {
  return await prisma.contato.update({
    where: { id },
    data: {
      nome: novosDados.nome,
      email: novosDados.email,
      telefone: novosDados.telefone,
      mensagem: novosDados.mensagem,
    },
  });
};

export const deletar = async (id) => {
  return await prisma.contato.delete({
    where: { id: Number(id)},
  });
};
