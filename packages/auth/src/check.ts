import type { Handle } from '@sveltejs/kit'
import { Names, sign } from './jwt';
import { verify } from './jwt';
import { set } from './cookies';
import { omitKeys } from '@repo/utils/object';
import { user as User } from '@repo/db';

export default (async ({ event: __event__, resolve }) => {

    let tokens: typeof Names = {
        'ACCESS': __event__.cookies.get(Names.ACCESS) || '',
        'REFRESH': __event__.cookies.get(Names.REFRESH) || '',
    };

    __event__.locals.isAuth = false;
    __event__.locals.user = null;

    if (!tokens.ACCESS && !tokens.REFRESH)
        return await resolve(__event__);

    if (tokens.REFRESH) {
        const accessVerify = verify(tokens.ACCESS, 'ACCESS');

        if (!accessVerify) {
            const refreshVerify = verify(tokens.REFRESH, 'REFRESH');

            if (refreshVerify) {
                const user = await User.findOrCreate({
                    where: { id: refreshVerify.id }
                });

                __event__.locals.user = user;
                __event__.locals.isAuth = true;
            

                set(__event__.cookies, sign(omitKeys(refreshVerify, ['exp', 'iat'])));
            } else return await resolve(__event__);
        } else {
            
            const user = await User.findOrCreate({
                where: { id: accessVerify.id }
            });
            
            __event__.locals.user = user;
            __event__.locals.isAuth = true;
            
            set(__event__.cookies, sign(omitKeys(accessVerify, ['exp', 'iat'])));
        }
    }

    return await resolve(__event__);
}) as Handle;