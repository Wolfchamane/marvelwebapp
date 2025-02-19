import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { GridLayout } from './index';

describe('GridLayout', () => {
	it('Default render has not changed', () => {
		expect(render(<GridLayout children={null} />).container.querySelector('div.grid-layout')).not.toBeNull();
	});
});
