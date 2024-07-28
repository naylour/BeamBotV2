import prisma from '@repo/db';
import { error, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
    try {
        await prisma.account.update({
            where: { id: locals.user?.id },
            data: {
                heSeeWelcomeScreen: true
            }
        });

        return new Response('ok');
    } catch {
        error(500);
    }
};