import { browser } from '$app/environment';
import { page } from '$app/stores';

type Handler = () => void;

export class Telegram {
    value = $state<TelegramType>();
    #handlers = $state<Handler[]>([]);

    constructor() {
        if(browser && window.Telegram) {
            this.value = window.Telegram;

            this.webapp.expand();
            this.webapp.ready();
            this.webapp.BackButton.onClick(() => {
                history.go(-1)
            });

            page.subscribe(pg => {
                if(pg && pg.url && pg.url.pathname === '/') this.webapp.BackButton.hide();
                else this.webapp.BackButton.show();
            });

            for (const handler of this.#handlers) {
                handler();
            }
        }
    }

    afterInit = (handler: Handler) => {
        if(this.value) return handler();

        this.#handlers = [...this.#handlers, handler];
    }

    get webapp() {
        return this.value?.WebApp as TelegramType['WebApp'];
    };
    get webview() {
        return this.value?.WebView as TelegramType['WebView'];
    };
    get utils() {
        return this.value?.Utils as TelegramType['Utils'];
    };
};


export const tg = new Telegram();