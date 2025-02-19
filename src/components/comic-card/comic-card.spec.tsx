import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { ComicCard } from './index.tsx';

describe('ComicCard', () => {
    it('Default rendered DOM is as expected', () => {
        const { container } = render(<ComicCard image={"/mock.png"} title={"Comic Title"}/>);
        const rootDiv: HTMLElement | null = container.querySelector('.comic-card');
        expect(rootDiv).not.toBeNull();
        expect(rootDiv?.querySelector('.comic-card__image')).not.toBeNull();
        expect(rootDiv?.querySelector('.comic-card__title')).not.toBeNull();
        expect(rootDiv?.querySelector('.comic-card__title')?.textContent).toEqual('Comic Title');
        expect(rootDiv?.querySelector('.comic-card__year')).not.toBeNull();
        expect(rootDiv?.querySelector('.comic-card__year')?.textContent).toEqual('');
    });

    it('Renders the year', () => {
        const { container } = render(<ComicCard image={"/mock.png"} title={"Comic Title"} year={2000}/>);
        const rootDiv: HTMLElement | null = container.querySelector('.comic-card');
        expect(rootDiv).not.toBeNull();
        expect(rootDiv?.querySelector('.comic-card__year')?.textContent).toEqual('2000');
    });
});