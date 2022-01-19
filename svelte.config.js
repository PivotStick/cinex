import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const { PROD, APP_NAME } = process.env;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		ssr: false,
		paths: {
			base: PROD ? `/${APP_NAME}` : ''
		},
		vite: {
			envPrefix: 'APP_'
		},
		adapter: adapter(),
		target: 'body'
	}
};

export default config;
