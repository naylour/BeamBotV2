import type { Cookies } from "@sveltejs/kit";
import { Names } from "./jwt";
import { convertExpires } from "@repo/utils/time";
import config from "@repo/config";

export const set = (cookies: Cookies, tokens: Partial<typeof Names>) => {
    if(tokens['ACCESS']) cookies.set(Names.ACCESS, tokens.ACCESS, {
        path: '/',
        secure: true,
        httpOnly: true,
        priority: 'high',
        sameSite: 'lax',
        maxAge: convertExpires(config.JWT_REFRESH_EXPIRES) / 1000,
    });
    if(tokens.REFRESH) cookies.set(Names.REFRESH, tokens.REFRESH, {
        path: '/',
        secure: true,
        httpOnly: true,
        priority: 'high',
        sameSite: 'lax',
        maxAge: convertExpires(config.JWT_REFRESH_EXPIRES) / 1000,
    });
};