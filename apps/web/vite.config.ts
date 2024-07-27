import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import config from '@repo/config';

export default defineConfig({
	plugins: [sveltekit()],
    server: {
        port: +config.WEB_PORT
    }
});
