import type {  Context as BotContext } from 'grammy';
import type { User } from '@repo/db/types';

export declare namespace Bot {
    interface UserData {
        id: number;
        username?: string;
        firstName?: string;
        lastName?: string;
        isPremium: boolean;
        lang?: string;
    }

    interface Context extends BotContext {
        data: UserData;
        user?: User
    }
}