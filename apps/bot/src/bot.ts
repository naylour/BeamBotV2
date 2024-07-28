import config from "@repo/config";
import { Bot } from "grammy";
import Context from "./context.ts";
import auth from "../middlewares/auth.ts";
import prisma from "@repo/db";
import { splitByFirstSpace } from '@repo/utils/string';

const bot = new Bot(config.TELEGRAM_API_TOKEN, {
    ContextConstructor: Context
});

bot.use(auth);

bot.command('invite', async __context__ => {
    await __context__.reply(`Ваша ссылка: https://t.me/${__context__.me.username}/?start=${__context__.user?.account.inviteCode}`)
});

bot.command('partner', async __context__ => {
    try {
        if(__context__.user?.role !== 'ADMIN') return await __context__.reply('Недостаточно прав!');

        const text = __context__.message?.text;

        if(!text || splitByFirstSpace(text).length !== 2) return await __context__.reply('Неправильно набрана команда!');

        let partner = await prisma.partner.findUnique({
            where: { name: splitByFirstSpace(text)[1] }
        });

        if(partner) return await __context__.reply('Партнёр с таким именем уже существует!');

        
        partner = await prisma.partner.create({
            data: { name: splitByFirstSpace(text)[1] }
        });

        await __context__.reply(`Ссылка для партнёра ${ partner.name }: https://t.me/${__context__.me.username}/?start=PaRtNeR${partner.inviteCode}`);
    } catch {
        await __context__.reply('Ошибка');
    }
});

bot.command('start', async __context__ => {
    await __context__.reply('Hello, world!', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'WebApp',
                    web_app: {
                        url: `https://${config.CORE_PATH}`
                    }
                }
            ]]
        }
    });
});

await bot.init();

export default bot;