import { error, json, type RequestHandler } from '@sveltejs/kit';
import bot from '@app/bot';
import prisma from '@repo/db';
import { serialize } from '@repo/utils/object';

export const POST: RequestHandler = async ({ locals, request }) => {

    const command = await request.json() as {
        action: 'tg-task' | 'task';
        taskId: number;
    };

    const task = await prisma.task.findUnique({
        where: { id: command.taskId }
    });

    if (!task) error(400);

    let incrBalance = true;

    if (task.chatId) {
        try {
            const { status } = await bot.api.getChatMember(task.chatId, locals.user?.id as number);

            if (["creator", "administrator", "member"].includes(status)) incrBalance = true;
            else incrBalance = false;
        } catch {
            incrBalance = false;
        }
    }


    if (incrBalance) {
        await prisma.account.update({
            where: { id: locals.user?.id },
            data: {
                completedTasks: {
                    connect: {
                        id: task.id
                    }
                }
            }
        });
        const wallet = await prisma.wallet.update({
            where: { id: locals.user?.id },
            data: {
                coins: {
                    increment: task.amountType === 'Coin' ? task.amount : 0
                },
                tickets: {
                    increment: task.amountType === 'Ticket' ? task.amount : 0
                },
            },
            include: {
                reward: true,
                spins: true
            }
        })
        return json({
            task,
            wallet: serialize(wallet)
        });
    }

    return error(404);
};