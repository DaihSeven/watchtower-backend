import express from 'express';
import { verificarToken } from '../middleware/verificarToken.js';
import { verificarAdmin } from '../middleware/verificarAdmin.js';
import * as adminController from '../controller/admin.controller.js';

const router = express.Router();

// Proteger TODAS as rotas: só admins autenticados acessam
router.use(verificarToken, verificarAdmin);

// Usuários
router.get('/usuarios', adminController.listarUsuarios);
router.delete('/usuarios/:id', adminController.deletarUsuario);

// Pessoas desaparecidas
router.delete('/pessoas/:id', adminController.deletarPessoa);

// Avistamentos
router.delete('/avistamentos/:id', adminController.deletarAvistamento);

// Contatos
router.delete('/contatos/:id', adminController.deletarContato);

export default router;
