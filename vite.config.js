import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	envPrefix: 'APP_',
	plugins: [sveltekit()]
};

export default config;
