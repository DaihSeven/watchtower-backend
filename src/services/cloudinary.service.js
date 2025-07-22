
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '../lib/prisma';
import fs from 'fs';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/cadastrar', upload.single('imagem'), async (req, res) => {
  try {
    const { nome, idade, dataDesaparecimento, descricao, userId } = req.body;
    const filePath = req.file?.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'pessoas',
    });

    fs.unlinkSync(filePath);

    const pessoa = await prisma.pessoaDesaparecida.create({
      data: {
        nome,
        idade: Number(idade),
        dataDesaparecimento: new Date(dataDesaparecimento),
        descricao,
        imagemUrl: result.secure_url,
        userId: Number(userId),
      },
    });

    return res.status(201).json(pessoa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro ao cadastrar pessoa' });
  }
});
