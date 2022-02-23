import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

process.env.APP_NAME = 'Cinex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		vite: {
			envPrefix: 'APP_'
		},
		adapter: adapter(),
		target: 'body'
	}
};

export default config;
