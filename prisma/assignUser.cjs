const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.uSER.findFirst(); // cuidado: o nome USER é sensível a maiúsculas

  if (!user) {
    console.error("Nenhum usuário encontrado.");
    return;
  }

  await prisma.pessoaDesaparecida.updateMany({
    data: { userId: user.id },
  });

  await prisma.avistamento.updateMany({
    data: { userId: user.id },
  });

  await prisma.contato.updateMany({
    data: { userId: user.id },
  });

  console.log("Todos os registros foram atualizados com o userId:", user.id);
}

main()
  .catch((e) => {
    console.error("Erro ao executar:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
