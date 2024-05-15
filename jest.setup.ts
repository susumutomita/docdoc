import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  // 必要に応じてデータベースの初期化やセットアップ
});

afterAll(async () => {
  await prisma.$disconnect();
  // 必要に応じてデータベースのクリーンアップ
});
