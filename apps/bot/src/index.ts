import { webhookCallback } from 'grammy';
import bot from './bot.ts';
import config from '@repo/config';
import updateWebhook from '../lib/updateWebhook.ts';


const handleUpdate = webhookCallback(bot, 'std/http');

(async () => {
    await updateWebhook();

    const server = Bun.serve({
        fetch: async (request, _server) => {
            const url = new URL(request.url);
            if (request.method === 'POST' && url.pathname.slice(1) === config.BOT_PATH) {
                try {
                    return await handleUpdate(request);
                } catch (err) {
                    console.error(err);
                }
            }
            return new Response();
        },
        port: +config.BOT_PORT
    });

    console.log(`Webhook-server start in: ${server.port}`);
})();