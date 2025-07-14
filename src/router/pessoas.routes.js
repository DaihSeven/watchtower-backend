import { Router } from "express";
import PessoaController from "../controller/pessoas.controller.js";
import { verificarToken } from "../middleware/verificarToken.js";

const pessoas = Router();

pessoas.get("/",PessoaController.getPessoas);
pessoas.post("/cadastrar", verificarToken, PessoaController.cadastrarPessoas)
pessoas.delete("/deletar/:id", verificarToken, PessoaController.deletarPessoas)
pessoas.patch("/atualizar/:id", verificarToken, PessoaController.AtualizarPessoas)



export default pessoas;