import { Api, Context as BotContext } from 'grammy';
import type { Update, UserFromGetMe } from 'grammy/types';
import type { Bot } from './types.d.ts';


export default class Context extends BotContext implements Bot.Context {
    user: Bot.Context['user'];

    constructor(update: Update, api: Api, me: UserFromGetMe) {
        super(update, api, me);
    }


    get data(): Bot.UserData {
        return {
            id: this.message?.from.id || (this.update?.callback_query?.from.id as number),
            username: this.message?.from.username || this.update.callback_query?.from.username,
            lastName: this.message?.from.last_name || this.update.callback_query?.from.last_name,
            firstName: this.message?.from.first_name || this.update.callback_query?.from.first_name,
            isPremium: !!this.message?.from.is_premium || !!this.update.callback_query?.from.is_premium,
            lang: this.message?.from.language_code || this.update.callback_query?.from.language_code
        };
    }
};