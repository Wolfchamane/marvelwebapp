import { URL, fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	base: loadEnv(mode, process.cwd(), '').VITE_BASE_PATH,
	plugins: [react(), webfontDownload()],
	define: {
		__IS_PRO__: JSON.stringify(/^pro/gi.test(mode)),
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			},
		],
	},
}));
