import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const { NODE_ENV } = process.env;

const PROD = NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		ssr: false,
		paths: {
			base: PROD ? '/cinex' : ''
		},
		vite: {
			envPrefix: 'APP_'
		},
		adapter: adapter(),
		target: 'body'
	}
};

export default config;
