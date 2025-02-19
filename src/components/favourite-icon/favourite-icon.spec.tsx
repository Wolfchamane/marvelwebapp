import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { FavouriteIcon } from './index';

describe('FavouriteIcon', () => {
	it('An <img/> is rendered', () => {
		expect(render(<FavouriteIcon />).container.querySelector('img')).not.toBeNull();
	});
});
