import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: [vitePreprocess(), preprocess()],

    kit: {
        adapter: adapter(),
        files: {
            appTemplate: resolve('template', 'index.html'),
            errorTemplate: resolve('template', 'error.html'),
            hooks: {
                client: resolve('lib', 'hooks', 'client.ts'),
                server: resolve('lib', 'hooks', 'server.ts'),
                universal: resolve('lib', 'hooks', 'universal.ts'),
            },
            lib: resolve('lib'),
            routes: resolve('template', 'routes'),
            params: resolve('template', 'params'),
        },
        alias: {
            sections: resolve('src', 'sections'),
            components: resolve('src', 'components'),
            stores: resolve('lib', 'stores'),
            styles: resolve('src', 'app', 'styles')
        }
    },
    compilerOptions: {
        runes: true
    }
};
