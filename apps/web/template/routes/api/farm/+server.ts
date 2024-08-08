import prisma from '@repo/db';
import { serialize } from '@repo/utils/object';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
    try {
        let farm = await prisma.farm.findFirst({
            where: {
                wallet: locals.user?.id as number,
                status: 'Process',
            }
        });

        return json(serialize(farm || {}));
    } catch(__error__) {
        error(__error__.status, __error__.body);
    }
};
export const POST: RequestHandler = async ({ locals }) => {
    try {
        let farm = await prisma.farm.findFirst({
            where: {
                wallet: locals.user?.id as number,
                status: 'Process',
            }
        });

        if(farm) error(403);

        farm = await prisma.farm.create({
            data: {
                status: 'Process',
                wallet: locals.user?.id as number
            }
        })

        return json(serialize(farm || {}));
    } catch(__error__) {
        error(__error__.status, __error__.body);
    }
};
export const PUT: RequestHandler = async ({ locals }) => {
    try {
        let farm = await prisma.farm.findFirst({
            where: {
                wallet: locals.user?.id as number,
                status: 'Process',
            }
        });

        if(farm) {
            farm = await prisma.farm.update({
                where: { id: farm.id },
                data: {
                    status: 'Done'
                }
            });

            const wallet = await prisma.wallet.update({
                where: { id: locals.user?.id as number },
                data: {
                    coins: {
                        increment: 0.01 * 60 * 60 * 8
                    }
                },
                include: {
                    User: {
                        select: {
                            refferAccount: true
                        }
                    }
                }
            });

            if(wallet.User.refferAccount) {
                await prisma.refferAccount.update({
                    where: { id: wallet.User.refferAccount.id },
                    data: {
                        earnedCoins: {
                            increment: 0.01 * 60 * 60 * 8 * .15
                        },
                        OneWhoInvited: {
                            update: {
                                User: {
                                    update: {
                                        wallet: {
                                            update: {
                                                coins: {
                                                    increment: 0.01 * 60 * 60 * 8 * .15
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
            return json(serialize(wallet));
        }

    } catch(__error__) {
        error(__error__.status, __error__.body);
    }
};