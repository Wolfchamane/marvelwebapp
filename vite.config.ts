import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';
import { URL, fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), webfontDownload()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			}
		]
	}
});
