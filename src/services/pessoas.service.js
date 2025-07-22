import { PrismaClient } from "@prisma/client";
import { uploadToCloudinary } from './cloudinary.service.js';
const prisma = new PrismaClient();

export async function getAllPessoas() {
  return await prisma.pessoaDesaparecida.findMany();
}

export async function createPessoas(data) {
  let imagemUrl = null;

  if (data.file) {
    const uploaded = await uploadToCloudinary(data.file.path);
    imagemUrl = uploaded.secure_url;
  }

  return await prisma.pessoaDesaparecida.create({
    data: {
      nome: data.nome,
      idade: data.idade,
      dataDesaparecimento: new Date(data.dataDesaparecimento),
      descricao: data.descricao ?? null,
      status: data.status ?? "ATIVO",
      userId: data.userId,
      imagemUrl, 
    },
  });
}


export async function deletandoPessoas(id) {
  const existing = await prisma.pessoaDesaparecida.findUnique({
    where: { id: Number(id) },
  });
  if (!existing) return null;

  return await prisma.pessoaDesaparecida.delete({
    where: { id: Number(id) },
  });
}

export async function updatedPessoasFull(id, data) {
  const updated = await prisma.pessoaDesaparecida.update({
    where: { id: Number(id) },
    data: {
      nome: data.nome,
      idade: data.idade,
      dataDesaparecimento: new Date(data.dataDesaparecimento),
      descricao: data.descricao ?? null,
      status: data.status ?? "ATIVO",
    },
  });
  return updated;
}
