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
    await __context__.reply(`Join me in mining Firecoin and get 4000 free coins! 🔥\n\nhttps://t.me/${__context__.me.username}/Dapp?startapp=${__context__.user?.account.inviteCode}`);
});

bot.command('partner', async __context__ => {
    try {
        if (__context__.user?.role !== 'ADMIN') return await __context__.reply('You have not enough rights!');

        const text = __context__.message?.text;

        if (!text || splitByFirstSpace(text).length !== 2) return await __context__.reply('Неправильно набрана команда!');

        let partner = await prisma.partner.findUnique({
            where: { name: splitByFirstSpace(text)[1] }
        });

        if (partner) return await __context__.reply('Партнёр с таким именем уже существует!');


        partner = await prisma.partner.create({
            data: { name: splitByFirstSpace(text)[1] }
        });

        await __context__.reply(`Ссылка для партнёра(старая) ${partner.name}: https://t.me/${__context__.me.username}/?start=PaRtNeR${partner.inviteCode}`);
        await __context__.reply(`Ссылка для партнёра ${partner.name}: https://t.me/${__context__.me.username}/Dapp?startapp=PaRtNeR${partner.inviteCode}`);
    } catch {
        await __context__.reply('Error');
    }
});

bot.command('start', async __context__ => {
    const text = '👽 Welcome to the world of BeamBot 🚀\n\n' +
        'Calling all humanoids, the depths of space are yours to fight for, set to the tune of cryptocurrency and special missions... 🌒\n' +
        'As an ambitious galactic explorer, you find yourself on the verge of riches and wealth, where collecting crystals and coins will line your pockets with the most expensive space dust... 🌌\n\n';

    await __context__.replyWithPhoto(`https://${config.CORE_PATH}/start.jpg`, {
        caption: text,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '🕹 Play',
                        web_app: {
                            url: `https://${config.CORE_PATH}`
                        }
                    }
                ],
                [
                    {
                        text: '😎 Invite Friends',
                        switch_inline_query: `Join me in mining Firecoin and get free coins! 🔥\n\nhttps://t.me/${__context__.me.username}/Dapp?startapp=${__context__.user?.account.inviteCode}`
                    },
                    {
                        text: '🤠 Join Community',
                        url: 'https://t.me/BeambotXYZ'
                    },
                ],
                [
                    {
                        text: '🐦 Twitter',
                        url: `https://x.com/BeamBotXYZ`
                       
                    },
                ],
            ]
        }
    });
});

await bot.init();

export default bot;