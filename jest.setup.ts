import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.$transaction([
    prisma.postTag.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

afterEach(async () => {
  await prisma.$transaction([
    prisma.postTag.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  await prisma.$disconnect();
});
