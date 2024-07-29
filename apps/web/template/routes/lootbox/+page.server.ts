import prisma from '@repo/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch }) => {
    const lastTenSpins = await fetch('/api/recent');
    let spinElems: App.SpinType[];

    if (locals.user?.wallet.spins.length === 0) spinElems = (await prisma.appData.findUnique({
        where: { title: 'spinFree' }
    }))?.data as unknown as App.SpinType[];
    else spinElems = (await prisma.appData.findUnique({
        where: { title: 'spin' }
    }))?.data as unknown as App.SpinType[];

    return {
        lastTenSpins: await lastTenSpins.json(),
        spinElems
    }
};