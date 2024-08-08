import prisma from "@repo/db";
import { serialize } from "@repo/utils/object";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const lastTenSpins = await prisma.spin.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            Wallet: {
                select: {
                    User: {
                        select: {
                            firstName: true
                        }
                    }
                }
            }
        }
    });
    return json(serialize(lastTenSpins));
};