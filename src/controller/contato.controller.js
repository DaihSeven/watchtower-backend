import {
  adicionarContato,
  listarTodos,
  buscarPorId,
  atualizar,
  deletar,
} from "../services/contato.service.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ContatoController {
  async listarContatos(req, res) {
    try {
      const contatos = await listarTodos();
      res.status(200).json({ contatos });
    } catch (error) {
      await logEvents(`Erro ao listar contato: ${error.message}`, "contato.log");
    }
  }

  async criarContato(req, res) {
    const { nome, telefone, email, mensagem } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ mensagem: "Usuário não autenticado." });
    }

    if (!nome || !email || !mensagem) {
      return res.status(400).json({
        mensagem: "Nome, email e mensagem são obrigatórios.",
      });
    }

    try {
      const novoContato = await adicionarContato({
        nome,
        email,
        telefone,
        mensagem,
        userId, // ✅ associa ao usuário logado
      });
      res
        .status(201)
        .json({ mensagem: "Contato criado com sucesso!", contato: novoContato });
    } catch (error) {
      res
        .status(400)
        .json({ mensagem: "Erro ao criar contato.", error: error.message });
    }
  }

  async buscarContatoPorId(req, res) {
    try {
      const contato = await buscarPorId(req.params.id);
      if (!contato) {
        return res.status(404).json({ mensagem: "Contato não encontrado." });
      }
      res.status(200).json({ contato });
    } catch (error) {
      await logEvents(`Erro ao buscar contato: ${error.message}`, "contato.log");
    }
  }

  async atualizarContato(req, res) {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ mensagem: "Usuário não autenticado." });
    }

    const contato = await prisma.contato.findUnique({
      where: { id },
    });

    if (!contato) {
      return res.status(404).json({ mensagem: "Contato não encontrado." });
    }

    if (contato.userId !== userId) {
      return res.status(403).json({
        mensagem: "Acesso negado. Este contato não pertence ao seu usuário.",
      });
    }

    try {
      const contatoAtualizado = await atualizar(id, req.body);
      res.status(200).json({
        mensagem: "Contato atualizado com sucesso!",
        contato: contatoAtualizado,
      });
    } catch (error) {
      res
        .status(400)
        .json({ mensagem: "Erro ao atualizar contato.", error: error.message });
    }
  }

  async deletarContato(req, res) {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ mensagem: "Usuário não autenticado." });
    }

    const contato = await prisma.contato.findUnique({
      where: { id },
    });

    if (!contato) {
      return res.status(404).json({ mensagem: "Contato não encontrado." });
    }

    if (contato.userId !== userId) {
      return res.status(403).json({
        mensagem: "Acesso negado. Este contato não pertence ao seu usuário.",
      });
    }

    try {
      const contatoDeletado = await deletar(id);
      res
        .status(200)
        .json({ mensagem: "Contato deletado com sucesso!", contato: contatoDeletado });
    } catch (error) {
      res
        .status(400)
        .json({ mensagem: "Erro ao deletar contato.", error: error.message });
    }
  }
}

export default new ContatoController();
