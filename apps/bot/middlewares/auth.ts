import type { Middleware } from "grammy";
import type Context from "../src/context.ts";
import prisma, { user as User } from '@repo/db';

export default (async (__context__, next) => {
    try {
        let isInviter = false;
        const message = __context__.message?.text?.split(' ');

        if(message && message.length === 2 && message[0] === '/start' && message?.[1])
            isInviter = true;
        
        const user = await User.findOrCreate({
            where: { id: __context__.data.id },
            data: {
                id: __context__.data.id,
                lastName: __context__.data.lastName,
                firstName: __context__.data.firstName,
                username: __context__.data.username,
                isPremium: __context__.data.isPremium,
                isHeInvited: true,
                account: {
                    create: {
                        reward: {
                            create: {}
                        }
                    }
                },
                role: 'REGULAR',
                wallet: {
                    create: {}
                },
                refferAccount: isInviter ? {
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

        if(user.refferAccount && isInviter) {
            await __context__.api.sendMessage(user.refferAccount.OneWhoInvited.User.id, `У вас новый реферал! @${user.username}`)
        }

        __context__.user = user;

        await next();
    } catch {
        await __context__.reply('Ошибка при авторизации!');
    }
}) as Middleware<Context>;