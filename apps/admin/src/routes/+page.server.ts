import type { PageServerLoad } from './$types';
import prisma from '@repo/db';
import { subDays } from 'date-fns';

export const load: PageServerLoad = async () => {
    const yesterday = subDays(new Date(), 1);

    const lastCreatedUsersCount = await prisma.user.count({
        where: {
            createdAt: {
                gte: yesterday,
            },
        }
    });

    const refferedUsersCount = await prisma.refferAccount.count();

    const totalWallet = await prisma.wallet.aggregate({
        _sum: {
            coins: true,
            tickets: true
        }
    });

    const invitedByPartners = await prisma.user.count({
        where: {
            partner: {
                not: null
            }
        }
    });

    const userDatesУ = await prisma.user.groupBy({
        by: ['createdAt'],
        _count: {
            id: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    let userDates = {};

    userDatesУ.forEach(item => {
        // Форматируем дату в формат YYYY-MM-DD
        const date = item.createdAt.toISOString().split('T')[0];
        userDates[date] = item._count.id;
      });

    return {
        stat: {
            lastCreatedUsersCount,
            refferedUsersCount,
            totalWallet,
            invitedByPartners,
            userDates
        }
    }
};
