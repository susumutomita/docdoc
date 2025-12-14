import { prisma } from './src/lib/prisma';

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
