import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';
import type { User } from '@repo/db/types';
import config from '@repo/config';
import type { JWT } from './types';
import type { Serialize } from '@repo/utils/object';

export const Names = {
    'ACCESS': `${config.APP_NAME}_ACCESS`,
    'REFRESH': `${config.APP_NAME}_REFRESH`,
};

export const
    sign = (payload: Serialize<User>): typeof Names => ({
        ACCESS: jwtSign(payload, config.JWT_ACCESS_KEY, {
            expiresIn: config.JWT_ACCESS_EXPIRES
        }),
        REFRESH: jwtSign(payload, config.JWT_REFRESH_KEY, {
            expiresIn: config.JWT_REFRESH_EXPIRES
        })
    }),
    verify = (token: string, type: keyof typeof Names) => {
        try {
            return jwtVerify(token, type === 'ACCESS' ? config.JWT_ACCESS_KEY : config.JWT_REFRESH_KEY) as JWT.Payload<Serialize<User>>;
        } catch {
            return null;
        }
    };