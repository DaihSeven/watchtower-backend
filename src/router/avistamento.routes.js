import { Router } from "express";
import AvistamentoController from "../controller/avistamento.controller.js"
import { verificarToken } from "../middleware/verificarToken.js";

const avistamento = Router();

avistamento.get("/",AvistamentoController.getAvistamentos);
avistamento.post("/cadastrar", verificarToken, AvistamentoController.cadastrarAvistamento);
avistamento.delete("/deletar/:id", verificarToken, AvistamentoController.deletarAvistamento);
avistamento.patch("/atualizar/:id", verificarToken, AvistamentoController.atualizarAvistamento);



export default avistamento;