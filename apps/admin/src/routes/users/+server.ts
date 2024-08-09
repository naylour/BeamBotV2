import prisma from '@repo/db';
import { json, type RequestHandler } from '@sveltejs/kit';
import { serialize } from '@repo/utils/object';

export const GET: RequestHandler = async ({ url }) => {
    const { limit, step } = Object.fromEntries(url.searchParams.entries()) as unknown as {
        step: number,
        limit: number
    };

    const users = await prisma.user.findMany({
        take: +limit,
        skip: +step,
        orderBy: {
            wallet: {
                coins: 'desc'
            },
        },
        include: {
            wallet: {
                include: {
                    _count: true
                }
            },
            account: {
                include: {
                    _count: true
                }
            },

        }
    });

    // users[0]

    const count = await prisma.user.count();

    return json(serialize({users, count}))
}
