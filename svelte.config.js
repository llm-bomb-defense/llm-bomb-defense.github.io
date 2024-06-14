/*
 * Useful links:
 * - https://www.okupter.com/blog/deploy-sveltekit-website-to-github-pages#create-a-new-sveltekit-project
 */

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() },
};

export default config;
