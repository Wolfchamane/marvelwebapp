import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Alert } from './index.tsx';
import { ALERT_TYPES, type AlertType } from './types';

describe('Alert', () => {
	const message: string = 'Message';
	Object.values(ALERT_TYPES).forEach((type: AlertType) => {
		it(`Presents "${type}" message`, () => {
			const { container } = render(<Alert type={type} message={message} />);
			const node = container.querySelector(`.alert--${type}`);
			expect(node).not.toBeUndefined();
			expect(node?.textContent).toEqual(message);
		});
	});
});
