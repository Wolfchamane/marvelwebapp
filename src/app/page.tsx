import type { Metadata } from 'next';
import { CharactersPage } from '@/features/characters';

export const metadata: Metadata = {
	title: 'MARVEL Characters',
};

export default function Page() {
	return <CharactersPage />;
}
