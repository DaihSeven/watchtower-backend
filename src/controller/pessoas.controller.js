import { logEvents } from "../middleware/logger.middleware.js";
import {
  getAllPessoas,
  createPessoas, 
  deletandoPessoas,
  updatedPessoasFull
} from "../services/pessoas.service.js";

class PessoaController
{
    async getPessoas(req, res) 
    {
        const pessoas = await getAllPessoas();
        res.status(200).json({ pessoas });
    }

    async cadastrarPessoas(req, res) {
  const {
    nome,
    idade,
    dataDesaparecimento,
    descricao,
    status
  } = req.body;

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  if (!nome || !idade || !dataDesaparecimento || !status) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  try {
    const pessoa = await createPessoas({
      nome,
      idade,
      dataDesaparecimento,
      descricao,
      status,
      userId,
      file: req.file,
    });

    res.status(201).json({ message: "Pessoa cadastrada com imagem!", pessoa });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar.", error: error.message });
  }
}

    async deletarPessoas(req, res) {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  const pessoa = await prisma.pessoaDesaparecida.findUnique({
    where: { id: Number(id) },
  });

  if (!pessoa) {
    return res.status(404).json({ message: "Pessoa não encontrada." });
  }

  if (pessoa.userId !== userId) {
    return res.status(403).json({ message: "Acesso negado. Esse cadastro não pertence a você." });
  }

  await logEvents(`Deletando id:${id}`, "deletaPessoas.log");
  const pessoaDeletada = await deletandoPessoas(id);
  res.status(200).json({
    message: "Cadastro de pessoa deletado com sucesso...",
    pessoaDeletada,
  });
}


    async AtualizarPessoas(req, res) {
  const { id } = req.params;
  const {
    nome,
    idade,
    dataDesaparecimento,
    descricao,
    status
  } = req.body;

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  if (!nome || !idade || !dataDesaparecimento || !status) {
    return res.status(400).json({ message: "Forneça todos os campos obrigatórios para continuar..." });
  }

  const pessoa = await prisma.pessoaDesaparecida.findUnique({
    where: { id: Number(id) },
  });

  if (!pessoa) {
    return res.status(404).json({ message: "Pessoa não encontrada." });
  }

  if (pessoa.userId !== userId) {
    return res.status(403).json({ message: "Acesso negado. Essa pessoa não pertence a você." });
  }

  const updated = await updatedPessoasFull(id, {
    nome,
    idade,
    dataDesaparecimento,
    descricao,
    status,
  });

  res.status(200).json({ message: "Pessoa atualizada completamente!", pessoas: updated });
}

}

export default new PessoaController();

