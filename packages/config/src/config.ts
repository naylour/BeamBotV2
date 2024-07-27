import { config, type DotenvParseOutput } from 'dotenv';
import { expand } from 'dotenv-expand';

export default class Config {
    #env: DotenvParseOutput;

    constructor(path?: string) {
        const { parsed, error } = config({ path, encoding: 'utf-8' });

        if (error) throw new Error('[ Repo.Config ] - Ошибка при нахожднии файла .env');

        if (!parsed) throw new Error('[ Repo.Config ] - Ошибка при чтении файла .env');


        const { parsed: parsedExpand } = expand({ parsed });

        this.#env = parsedExpand || {};
    }

    get env() {
        return this.#env;
    };

    get = (key: string): string => {
        const response = this.#env[key];

        if(!response) throw new Error(`[ Repo.Config ] - Не удалось найти занчение по ключу ${key}!`);

        return response;
    }
}