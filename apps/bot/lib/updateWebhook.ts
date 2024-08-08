import config from '@repo/config';

export default async () => {
    try {
        console.log('Обновление точки WebHook для бота');
    
        // const deleteRes = await fetch(`https://api.telegram.org/bot${config.TELEGRAM_API_TOKEN}/deleteWebhook`);
    
        // if(deleteRes.status === 200) console.log('Удаление прошло успешно');
        // else console.log('Ошибка при удалении');
    
    
        const setRes = await fetch(`https://api.telegram.org/bot${config.TELEGRAM_API_TOKEN}/setWebhook?url=${config.CORE_PATH}/${config.BOT_PATH}`, {
            method: 'POST',
            body: JSON.stringify({
                ip_address: config.CORE_IP
            }),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if(setRes.status === 200) {
            console.log('Обновление точки WebHook прошло успешно');
        }
        else console.log('Обновление точки WebHook закончилась ошибкой');
        console.log(await setRes.json())
    } catch (__error__) {
        console.log('Обновление точки WebHook закончилась ошибкой');
    }
}