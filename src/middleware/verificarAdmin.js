export function verificarAdmin(req, res, next) {
  const role = req.user?.tipo_usuario;
  if (role !== 'ADMIN' && role !== 'ADMIN_FIXO') {
    return res.status(403).json({ mensagem: 'Acesso restrito a administradores.' });
  }

  next();
}
