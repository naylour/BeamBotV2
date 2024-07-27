import prisma from "@repo/db";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ parent }) => {
    try {
        const data = await parent();

        if (data.user) {
            let reffers = await prisma.refferAccount.findMany({
                where: {
                    OneWhoInvited: {
                        inviteCode: data.user.account.inviteCode
                    }
                },
                select: {
                    earnedCoins: true,
                    earnedTickets: true,
                    User: {
                        select: {
                            username: true,
                            firstName: true
                        }
                    }
                },
            });
            return { reffers };
        } else error(401, { message: 'Не авторизован!' });
    } catch(__error__) {
        console.log(__error__)
        !dev && error(500, { message: 'Ошибка сервера!' });
        return {
            reffers: []
        }
    }
};