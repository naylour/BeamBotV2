import prisma from '@repo/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const count = await prisma.reward.count({
        where: {
            day: {
                gte: 1,
                lte: 9
            }
        }
    })
    return { count };
}) satisfies PageServerLoad;