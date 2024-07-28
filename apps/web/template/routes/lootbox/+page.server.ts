import prisma from '@repo/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const lastTenSpins = await prisma.spin.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            Wallet: {
                select: {
                    User: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    });

    let spinElems: App.SpinType[];

    if (locals.user?.wallet.spins.length === 0) spinElems = (await prisma.appData.findUnique({
        where: { title: 'spinFree' }
    }))?.data as unknown as App.SpinType[];
    else spinElems = (await prisma.appData.findUnique({
        where: { title: 'spin' }
    }))?.data as unknown as App.SpinType[];

    return {
        lastTenSpins,
        spinElems
    }
};