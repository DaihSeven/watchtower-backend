import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export const registrarUsuario = async ({ nome, email, senha, tipo_usuario }) => {
  const senha_hash = await bcrypt.hash(senha, 10);

  const user = await prisma.uSER.create({
    data: {
      nome,
      email,
      senha_hash,
      tipo_usuario,
    },
  });

  return {
    mensagem: "Usuário registrado com sucesso!",
    usuario: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipo_usuario: user.tipo_usuario,
    },
  };
};

export const loginUsuario = async ({ email, senha }) => {

  const isAdminEmail1 = email === process.env.ADMIN_EMAIL_1 && senha === process.env.ADMIN_PASSWORD_1;
  const isAdminEmail2 = email === process.env.ADMIN_EMAIL_2 && senha === process.env.ADMIN_PASSWORD_2;

  if (isAdminEmail1 || isAdminEmail2) {
    const token = jwt.sign(
      { id: 0, email, tipo_usuario: 'ADMIN_FIXO' },
      SECRET,
      { expiresIn: '1h' }
    );
    return { token };
  }

  const user = await prisma.uSER.findUnique({ where: { email } });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const senhaCorreta = await bcrypt.compare(senha, user.senha_hash);
  if (!senhaCorreta) {
    throw new Error('Senha incorreta');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: '1h' }
  );

  return {
    mensagem: "Login realizado com sucesso!",
    token,
    usuario: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipo_usuario: user.tipo_usuario,
    }
  };
};
