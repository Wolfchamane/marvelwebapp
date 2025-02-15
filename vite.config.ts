import react from '@vitejs/plugin-react';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), webfontDownload()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			},
		],
	},
});
