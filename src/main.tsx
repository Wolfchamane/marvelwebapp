import './styles/main.sass';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './app/store';

function loadServiceWorker(): void {
	if ('serviceWorker' in navigator && import.meta.env.PROD) {
		navigator.serviceWorker
			.register(`${import.meta.env.VITE_BASE_PATH}sw.js`, { type: 'module' })
			.then(() => console.log(`serviceWorker ${import.meta.env.VITE_APP_VERSION} loaded!`))
			.catch(error => console.error(`Error registering service worker:\n${error}`));
	}
}

function loadApplication(): void {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>
	);
}

function toggleOffInitVeil(): void {
	const timeoutDelay: number = 500;
	const className: string = 'init_veil';
	const veil: HTMLElement | null = document.querySelector(`.${className}`);
	if (veil) {
		setTimeout(() => {
			veil.classList.add(`${className}--fade`);
			setTimeout(() => {
				veil.classList.add(`${className}--hide`);
				veil.classList.remove(`${className}--fade`);
			}, timeoutDelay);
		}, timeoutDelay);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	loadServiceWorker();
	loadApplication();
	toggleOffInitVeil();
});
