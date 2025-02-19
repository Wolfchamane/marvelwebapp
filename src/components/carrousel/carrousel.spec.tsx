import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Carrousel } from './index.tsx';

describe('Carrousel', () => {
	it('Renders content passed as children', () => {
		const { container } = render(
			<Carrousel>
				<span>Mock</span>
			</Carrousel>
		);
		const span: HTMLElement | null = container.querySelector('.carrousel span');
		expect(span).not.toBeNull();
		expect(span?.textContent).toEqual('Mock');
	});
});
