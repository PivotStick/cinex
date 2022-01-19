import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

process.env.APP_NAME = 'Cinex';

const { NODE_ENV, APP_NAME } = process.env;

const PROD = NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		ssr: false,
		paths: {
			base: PROD ? `/${APP_NAME}`.toLowerCase() : ''
		},
		vite: {
			envPrefix: 'APP_'
		},
		adapter: adapter(),
		target: 'body'
	}
};

export default config;
