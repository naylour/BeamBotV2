import { app } from "./app.svelte";

class User {
    #value = $state<App.User | null>(null);

    constructor() { };

    init = async (queryData: TelegramType['WebApp']['initData']) => {
        const response = await fetch('/auth', {
            method: 'post',
            headers: {
                'Content-Type': 'application/text'
            },
            body: queryData,
        })

        if(response.status === 200) {
            const data = await response.json() as App.User

            this.#value = data;
            setTimeout(() => app.value.loader.isLoad = true, 1000);
        }
    }

    get value(): App.User | null {
        return this.#value;
    };
    set value(newValue: App.User) {
        this.#value = newValue;
    };
};

export const user = new User();