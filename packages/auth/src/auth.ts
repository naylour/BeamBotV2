import { error, type RequestHandler } from "@sveltejs/kit";
import { user as User } from '@repo/db';
import { sign } from "./jwt";
import { set } from "./cookies";
import { stringify } from '@repo/utils/object';
import { verify } from '@repo/utils/telegram';

export default (async ({ request, cookies }) => {    
    const initData = await request.text();

    const verifyRes = verify(initData);

    if(!verifyRes) return error(401, { message: 'Не валидные данные!' });

    const user = await User.findOrCreate({
        where: { id: verifyRes }
    });

    if(!user) return error(402, { message: 'Пользователь не найден!' });

    const tokens = sign(user);

    set(cookies, tokens);

    return new Response(stringify(user));
}) as RequestHandler;