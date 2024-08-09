import { error, type RequestHandler } from "@sveltejs/kit";
import prisma, { user as User } from '@repo/db';
import { sign } from "./jwt";
import { set } from "./cookies";
import { stringify } from '@repo/utils/object';
import { getAccountAge, verify } from '@repo/utils/telegram';
import { calculateIncrement } from '@repo/utils/number';

export default (async ({ request, cookies }) => {
    const queryData = await request.json() as {
        initData: string;
        initDataUnsafe: object;
    };
    
    const verifyRes = verify(queryData.initData);
    
    if (!verifyRes) return error(401, { message: 'Не валидные данные!' });

    let fromInviter = false;
    let isPartnerInvite = false;
    const age = getAccountAge(verifyRes);

    if (queryData.initDataUnsafe?.start_param && !queryData.initDataUnsafe?.start_param?.startsWith('PaRtNeR'))
        fromInviter = true;


    if (queryData.initDataUnsafe?.start_param && queryData.initDataUnsafe?.start_param?.startsWith('PaRtNeR')) isPartnerInvite = true;


    // let user = await prisma.user.findUnique({
    //     where: { id: verifyRes },
    //     select: {
    //         account: {
    //             select: {
    //                 _count: true,
    //                 age: true,
    //                 level: true,
    //                 completedTasks: true,
    //                 inviteCode: true,
    //                 updatedAt: true,
    //                 heSeeWelcomeScreen: true,
    //                 createdAt: true,
    //             }
    //         },
    //         wallet: {
    //             select: {
    //                 reward: true,
    //                 coins: true,
    //                 tickets: true,
    //                 updatedAt: true,
    //                 createdAt: true,
    //                 spins: {
    //                     select: {
    //                         amount: true,
    //                         type: true,
    //                         createdAt: true,
    //                         updatedAt: true
    //                     },
    //                     take: 1,
    //                     orderBy: {
    //                         createdAt: 'desc'
    //                     }
    //                 }
    //             }
    //         },
    //         refferAccount: {
    //             select: {
    //                 earnedCoins: true,
    //                 earnedTickets: true,
    //                 updatedAt: true,
    //                 createdAt: true,
    //                 OneWhoInvited: {
    //                     select: {
    //                         User: true,
    //                     }
    //                 }
    //             }
    //         },
    //         Partner: {
    //             select: {
    //                 name: true,
    //                 inviteCode: true
    //             }
    //         }
    //     }
    // });

    let user;

    try {
        user = await User.findOrCreate({
            where: { id: verifyRes },
            data: {
                id: queryData.initDataUnsafe.user?.id,
                lastName: queryData.initDataUnsafe.user?.last_name,
                firstName: queryData.initDataUnsafe.user?.first_name,
                username: queryData.initDataUnsafe.user?.username,
                isPremium: queryData.initDataUnsafe.user?.is_premium ? queryData.initDataUnsafe.user?.is_premium : false,
                account: {
                    create: {
                        age,
                    }
                },
                role: 'REGULAR',
                wallet: {
                    create: {
                        reward: {
                            create: {
                                coinsCount: 50,
                                ticketCount: 1,
                                day: 0
                            }
                        },
                        coins: calculateIncrement(7500, age) + (queryData.initDataUnsafe.user?.is_premium ? 500 : 0)
                    }
                },
            }
        });

        if (fromInviter) {
            try {
                await prisma.account.update({
                    where: { inviteCode: queryData.initDataUnsafe?.start_param as string },
                    data: {
                        reffers: {
                            create: {
                                id: user.id,
                            }
                        }
                    }
                })
            } catch { }
        }

        if (isPartnerInvite) {
            try {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        partner: queryData.initDataUnsafe?.start_param?.slice(7)
                    }
                });
            } catch (__error__) {
                console.error(__error__);
            }
        }
    } catch (__error__) {
        console.log(__error__)
        user = null;
    }

    if (!user) return error(402, { message: 'Пользователь не найден!' });

    const tokens = sign(user);

    set(cookies, tokens);

    return new Response(stringify(user));
}) as RequestHandler;