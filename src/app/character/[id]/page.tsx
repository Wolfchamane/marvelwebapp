import type { Metadata } from 'next';
import { CharacterDetail } from '@/features/character-detail';

interface CharacterPageInput {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CharacterPageInput): Promise<Metadata> {
	const id = (await params).id;

	return {
		title: `Character ${id}`,
	};
}

export default async function Page({ params }: CharacterPageInput) {
	return <CharacterDetail id={(await params).id} />;
}
