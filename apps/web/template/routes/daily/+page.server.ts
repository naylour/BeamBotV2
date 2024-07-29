import prisma from '@repo/db';
import type { PageServerLoad } from './$types';
import { serialize } from '@repo/utils/object';

function isMoreThan24HoursAgo(date: Date, dayCount = 1): boolean {
    // Текущая дата и время
    const now = new Date();

    // Разница во времени в миллисекундах
    const diffInMillis = now.getTime() - date.getTime();

    // Переводим миллисекунды в часы
    const diffInHours = diffInMillis / (1000 * 60 * 60);

    // Проверяем, прошло ли более 24 часов
    return diffInHours > 24 * dayCount;
}

export const load: PageServerLoad = async ({ locals }) => {
    try {
        let reward = await prisma.reward.findUnique({
            where: { id: locals.user?.id }
        });
        let wallet = await prisma.wallet.findUnique({
            where: { id: locals.user?.id }
        })
    
        if (!reward) return {};
    
        if (!reward.lastReward) {
            reward = await prisma.reward.update({
                where: { id: reward.id },
                data: {
                    lastReward: new Date(),
                    day: {
                        increment: 1
                    }
                }
            })
            wallet = await prisma.wallet.update({
                where: { id: reward.id },
                data: {
                    coins: {
                        increment: reward.coinsCount || 1
                    },
                    tickets: {
                        increment: reward.ticketCount || 1
                    }
                }
            });
    
            return { reward };
        }
    
    
        if (isMoreThan24HoursAgo(reward.lastReward)) {
    
            reward = await prisma.reward.update({
                where: { id: reward.id },
                data: {
                    lastReward: new Date(),
                    ticketCount: (reward.ticketCount || 0) + 1 > 7 ? 7 : (reward.ticketCount || 0) + 1,
                    coinsCount: (reward.coinsCount || 0) + 500 > 5000 ? 5000 : (reward.coinsCount || 0) + 500,
                    day: {
                        increment: 1
                    }
                }
            });
    
            wallet = await prisma.wallet.update({
                where: { id: reward.id },
                data: {
                    coins: {
                        increment: reward.coinsCount || 1
                    },
                    tickets: {
                        increment: reward.ticketCount || 1
                    }
                }
            })
        } else if (isMoreThan24HoursAgo(reward.lastReward, 2)) reward = await prisma.reward.update({
            where: { id: reward.id },
            data: {
                lastReward: new Date(),
                ticketCount: 1,
                coinsCount: 500,
                day: 1
            }
        });
    
        return {
            reward: serialize(reward),
            wallet: serialize(wallet || {})
        }
    } catch {
        return {}
    }
};