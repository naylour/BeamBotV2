import config from '@repo/config';
import { insert } from '@repo/utils/string';

try {
    const FormatedConfig = insert(await Bun.file(`${import.meta.dirname}/Caddyfile`).text(), {
        webappPath: config.WEB_PATH,
        webappPort: config.WEB_PORT,
        botPath: config.BOT_PATH,
        botPort: config.BOT_PORT,
        rootPath: config.CORE_PATH,
        rootIp: config.CORE_IP,
    }, '$');

    
    console.log(FormatedConfig)

    const response = await fetch('http://localhost:2019/load', {
        method: 'post',
        headers: {
            'Content-Type': 'text/caddyfile',
        },
        body: FormatedConfig
    });

    const data = await response.json();

    console.log(data)

} catch {
    console.log('Ошибка при обновлении Caddyfile');
}