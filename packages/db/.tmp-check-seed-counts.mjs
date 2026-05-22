import dotenv from 'dotenv';
import path from 'node:path';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL missing');
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

try {
  const [c, q, a] = await Promise.all([
    prisma.onBoardingCategory.count(),
    prisma.onBoardingQuestion.count(),
    prisma.onBoardingAnswerProposition.count(),
  ]);
  console.log(JSON.stringify({ onBoardingCategory: c, onBoardingQuestion: q, onBoardingAnswerProposition: a }, null, 2));
} finally {
  await prisma.$disconnect();
}
