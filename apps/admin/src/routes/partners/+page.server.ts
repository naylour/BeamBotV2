import prisma from '@repo/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const partners = await prisma.partner.findMany({
        include: {
            _count: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return { partners };
}) satisfies PageServerLoad;
