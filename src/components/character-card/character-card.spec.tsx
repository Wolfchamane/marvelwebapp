import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { CharacterCard } from './index.tsx';

describe('CharacterCard', () => {
    it('DOM structure is as expected', () => {
        const { container } = render(<BrowserRouter><CharacterCard id={101} name={"Mock"} image={"/mock.png"} isFavourite={false}/></BrowserRouter>);
        const characterCard: HTMLElement | null = container.querySelector('.character-card');
        expect(characterCard).not.toBeNull();
        expect(characterCard?.querySelector('.character-card__image')).not.toBeNull();
        expect(characterCard?.querySelector('.character-card__name-text')).not.toBeNull();
        expect(characterCard?.querySelector('.character-card__name-text')?.textContent).toEqual('Mock');
        expect(characterCard?.querySelector('.character-card__heart')).not.toBeNull();
        expect(characterCard?.querySelector('.character-card__heart--filled')).toBeNull();
    });

    it('If is favourite, icon changes', () => {
        const { container } = render(<BrowserRouter><CharacterCard id={101} name={"Mock"} image={"/mock.png"} isFavourite={true}/></BrowserRouter>);
        const characterCard: HTMLElement | null = container.querySelector('.character-card');
        expect(characterCard).not.toBeNull();
        expect(characterCard?.querySelector('.character-card__heart--filled')).not.toBeNull();
    });
});