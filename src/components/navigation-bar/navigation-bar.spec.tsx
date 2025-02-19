import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router';
import { renderWithProviders } from '@/../tests/unit/render-with-providers';
import { NavigationBar } from './index';

describe('NavigationBar', () => {
	it('Default render has not been modified', () => {
		const { container } = renderWithProviders(
			<BrowserRouter>
				<NavigationBar />
			</BrowserRouter>
		);
		expect(container.querySelector('.navigation-bar')).not.toBeNull();
		expect(container.querySelector('.navigation-bar__menu')).not.toBeNull();
		expect(container.querySelector('.navigation-bar li:first-child img')).not.toBeNull();
		expect(container.querySelector('.navigation-bar__empty')).not.toBeNull();
		expect(container.querySelector('.navigation-bar__favourites')).not.toBeNull();
		expect(container.querySelector('.navigation-bar__favourites-text')).not.toBeNull();
		expect(container.querySelector('.navigation-bar__favourites-text')?.textContent).toEqual('0');
		expect(container.querySelector('.navigation-bar__loader')).not.toBeNull();
		expect(container.querySelector('.navigation-bar__loader--animate')).toBeNull();
	});
});
