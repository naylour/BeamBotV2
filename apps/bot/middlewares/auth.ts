import type { Middleware } from "grammy";
import type Context from "../src/context.ts";
import { user as User } from '@repo/db';
import { getAccountAge } from '@repo/utils/telegram';
import { calculateIncrement } from '@repo/utils/number';
import { splitByFirstSpace } from "@repo/utils/string";

export default (async (__context__, next) => {
    try {
        const age = getAccountAge(__context__.data.id);

        let fromInviter = false;

        const message = splitByFirstSpace(__context__.message?.text || '');

        if(message.length <= 0) return;

        if(message.length > 2) return;


        if(message[0] === '/start' && message?.[1])
            fromInviter = true;

        let isPartnerInvite = false;

        if(message[1]?.startsWith('PaRtNeR')) isPartnerInvite = true;
        
        const user = await User.findOrCreate({
            where: { id: __context__.data.id },
            data: {
                id: __context__.data.id,
                lastName: __context__.data.lastName,
                firstName: __context__.data.firstName,
                username: __context__.data.username,
                isPremium: __context__.data.isPremium,
                Partner: isPartnerInvite ? {
                    connect: {
                        inviteCode: message[1].slice(7)
                    }
                } : undefined,
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
                        coins: calculateIncrement(7500, age) + (__context__.data.isPremium ? 500 : 0)
                    }
                },
                refferAccount: fromInviter && !isPartnerInvite ? {
                    create: {
                        OneWhoInvited: {
                            connect: {
                                inviteCode: message?.[1] as string
                            }
                        }
                    }
                } : undefined
            }
        });

        if(user.refferAccount && fromInviter) {
            await __context__.api.sendMessage(user.refferAccount.OneWhoInvited.User.id, `У вас новый реферал! @${user.username}`)
        }

        __context__.user = user;

        await next();
    } catch(__error__) {
        console.log(__error__)
        await __context__.reply('Ошибка при авторизации!');
    }
}) as Middleware<Context>;