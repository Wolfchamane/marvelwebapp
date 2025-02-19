/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_HOSTNAME: string;
	readonly VITE_API_KEY: string;
	readonly VITE_BASE_PATH: string;
	readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
