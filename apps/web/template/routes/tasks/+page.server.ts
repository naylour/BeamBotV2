import prisma from '@repo/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {}
        });

        return { tasks };
    } catch {

    }
};