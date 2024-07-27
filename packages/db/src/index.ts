import { PrismaClient } from '@prisma/client';
import User from './user.ts';

const prisma = new PrismaClient();

export const user = User(prisma);

export default prisma;