import type { Prisma, PrismaClient } from '@prisma/client';
import { type Serialize, serialize } from '@repo/utils/object';
import type { User } from './types.ts';

type FindOrCreate = (
    query: {
        where: Prisma.UserWhereUniqueInput,
        data?: Prisma.UserCreateInput
    }
) => Promise<Serialize<User>>;

export default (prisma: PrismaClient) => ({
    findOrCreate: (async query => {
        const include: Prisma.UserInclude = {
            account: {
                select: {
                    _count: true,
                    age: true,
                    level: true,
                    inviteCode: true,
                    updatedAt: true,
                    createdAt: true,
                    reward: true
                }
            },
            wallet: {
                select: {
                    coins: true,
                    tickets: true,
                    updatedAt: true,
                    createdAt: true
                }
            },
            refferAccount: {
                select: {
                    earnedCoins: true,
                    earnedTickets: true,
                    updatedAt: true,
                    createdAt: true,
                    OneWhoInvited: {
                        select: {
                            User: true,
                        }
                    }
                }
            }
        };
        
        let user = await prisma.user.findUnique({
            where: query.where,
            include
        });

        if(!user && query.data) user = await prisma.user.create({
            data: query.data,
            include
        });

        return serialize(user as unknown as User);
    }) as FindOrCreate,
});