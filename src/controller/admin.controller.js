import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listarUsuarios(req, res) {
  try {
    const users = await prisma.uSER.findMany({
      select: { id: true, nome: true, email: true, tipo_usuario: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar usuários.', error });
  }
}

export async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;
    await prisma.uSER.delete({ where: { id: Number(id) } });
    res.json({ mensagem: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar usuário.', error });
  }
}

export async function deletarPessoa(req, res) {
  try {
    const { id } = req.params;
    await prisma.pessoaDesaparecida.delete({ where: { id: Number(id) } });
    res.json({ mensagem: 'Pessoa desaparecida deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar pessoa desaparecida.', error });
  }
}

export async function deletarAvistamento(req, res) {
  try {
    const { id } = req.params;
    await prisma.avistamento.delete({ where: { id: Number(id) } });
    res.json({ mensagem: 'Avistamento deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar avistamento.', error });
  }
}

export async function deletarContato(req, res) {
    try {
        const { id } = req.params;
        await prisma.contato.delete({ where: { id: Number(id) } });
        res.json({ mensagem: 'Contato deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar contato.', error });
    }
}