import config from "@repo/config";
import { Bot } from "grammy";
import Context from "./context.ts";
import auth from "../middlewares/auth.ts";

const bot = new Bot(config.TELEGRAM_API_TOKEN, {
    ContextConstructor: Context
});

bot.use(auth);

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