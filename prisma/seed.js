import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🟢 Seed rodando...');
 
  const senhaHash = await bcrypt.hash('senhaSegura123', 10)

  const admin = await prisma.uSER.upsert({
    where: { email: 'admin@site.com' },
    update: {},
    create: {
      nome: 'Admin Principal',
      email: 'admin@site.com',
      senha_hash: senhaHash,
      tipo_usuario: 'admin',
    },
  })

  //  usuários comuns
  const usuarios = await Promise.all([
    prisma.uSER.create({
      data: {
        nome: 'Maria Fernandes',
        email: 'maria@exemplo.com',
        senha_hash: await bcrypt.hash('maria123', 10),
        tipo_usuario: 'usuario',
      },
    }),
    prisma.uSER.create({
      data: {
        nome: 'Carlos Dias',
        email: 'carlos@exemplo.com',
        senha_hash: await bcrypt.hash('carlos123', 10),
        tipo_usuario: 'usuario',
      },
    }),
    prisma.uSER.create({
      data: {
        nome: 'Fernanda Souza',
        email: 'fernanda@exemplo.com',
        senha_hash: await bcrypt.hash('fernanda123', 10),
        tipo_usuario: 'usuario',
      },
    }),
  ])

  //  pessoas desaparecidas
  const pessoasDesaparecidas = await Promise.all([
    prisma.pessoaDesaparecida.create({
      data: {
        nome: 'João da Silva',
        idade: 35,
        descricao: 'Última vez visto com camiseta azul.',
        dataDesaparecimento: new Date('2024-05-12'),
        imagemUrl: 'https://res.cloudinary.com/dc4u1dvc6/image/upload/v1753199377/jo%C3%A3osilva_beyciz.jpg',
        usuario: { connect: { id: usuarios[0].id } },
      },
    }),
    prisma.pessoaDesaparecida.create({
      data: {
        nome: 'Ana Clara Santos',
        idade: 22,
        descricao: 'Desapareceu ao sair da faculdade.',
        dataDesaparecimento: new Date('2024-06-01'),
        imagemUrl: 'https://res.cloudinary.com/dc4u1dvc6/image/upload/v1753199408/Captura_de_tela_2025-07-22_124915_spxoqa.png',
        usuario: { connect: { id: usuarios[1].id } },
      },
    }),
    prisma.pessoaDesaparecida.create({
      data: {
        nome: 'Ricardo Lima',
        idade: 40,
        descricao: 'Foi visto na rodoviária pela última vez.',
        dataDesaparecimento: new Date('2024-06-15'),
        imagemUrl: 'https://res.cloudinary.com/dc4u1dvc6/image/upload/v1753199377/ricardo_etmxqu.webp',
        usuario: { connect: { id: usuarios[2].id } },
      },
    }),
  ])

// Busca usuários existentes do banco
/*const usuarios = await prisma.uSER.findMany({
  orderBy: { id: 'asc' }, // ordena para manter a ordem
  take: 3, // assume que você só precisa dos 3 primeiros
});

// Busca pessoas desaparecidas existentes do banco
const pessoasDesaparecidas = await prisma.pessoaDesaparecida.findMany({
  orderBy: { id: 'asc' },
  take: 3,
});
*/
  //  avistamentos
  await Promise.all([
  prisma.avistamento.create({
    data: {
      comentario: 'Vi ele perto da estação.',
      localAvistamento: 'Estação Sé, São Paulo',
      latitude: -23.5505,
      longitude: -46.6333,
      nomeInformante: 'Carlos Oliveira',
      contatoInformante: '11999999999',
      usuario: { connect: { id: usuarios[0].id } },
      pessoaDesaparecida: { connect: { id: pessoasDesaparecidas[0].id } },
    },
  }),
  prisma.avistamento.create({
    data: {
      comentario: 'Estava caminhando no centro.',
      localAvistamento: 'Centro de Campinas',
      latitude: -22.9099,
      longitude: -47.0626,
      nomeInformante: 'Luciana Souza',
      contatoInformante: '11998887766',
      usuario: { connect: { id: usuarios[1].id } },
      pessoaDesaparecida: { connect: { id: pessoasDesaparecidas[1].id } },
    },
  }),
  prisma.avistamento.create({
    data: {
      comentario: 'Pediu informações próximo à rodoviária.',
      localAvistamento: 'Rodoviária de Curitiba',
      latitude: -25.4284,
      longitude: -49.2733,
      nomeInformante: 'Pedro Lima',
      contatoInformante: '11997776655',
      usuario: { connect: { id: usuarios[2].id } },
      pessoaDesaparecida: { connect: { id: pessoasDesaparecidas[2].id } },
    },
  }),
])

  //  contatos
  await Promise.all([
    prisma.contato.create({
      data: {
        userId: usuarios[0].id,
        nome: 'Maria Fernandes',
        email: 'maria@exemplo.com',
        telefone: '11998887766',
        mensagem: 'Quero ajudar na divulgação.',
      },
    }),
    prisma.contato.create({
      data: {
        userId: usuarios[1].id,
        nome: 'Carlos Dias',
        email: 'carlos@exemplo.com',
        telefone: '11991112222',
        mensagem: 'Sou jornalista e gostaria de fazer uma matéria.',
      },
    }),
    prisma.contato.create({
      data: {
        userId: usuarios[2].id,
        nome: 'Fernanda Souza',
        email: 'fernanda@exemplo.com',
        telefone: '11993334444',
        mensagem: 'Tenho informações de uma pessoa desaparecida.',
      },
    }),
  ])

  //  pessoas com localizações
  await Promise.all([
    prisma.pessoa.create({
      data: {
        nome: 'José Lima',
        idade: 42,
        email: 'jose@lima.com',
        localizacoes: {
          create: [{ latitude: -23.5567, longitude: -46.6395 }],
        },
      },
    }),
    prisma.pessoa.create({
      data: {
        nome: 'Patrícia Souza',
        idade: 28,
        email: 'patricia@souza.com',
        localizacoes: {
          create: [{ latitude: -22.9083, longitude: -43.1964 }],
        },
      },
    }),
    prisma.pessoa.create({
      data: {
        nome: 'Rodrigo Nunes',
        idade: 37,
        email: 'rodrigo@nunes.com',
        localizacoes: {
          create: [{ latitude: -15.7942, longitude: -47.8822 }],
        },
      },
    }),
  ])

  console.log('✅ Seed completo com 3 exemplos para cada entidade!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
