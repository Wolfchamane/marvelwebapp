import './styles.sass';
import { CharacterCard, SearchForm } from '@/components/index';
import { OutputHttpAdapter } from './adapters/output.http-adapter';
import { DefaultCharactersUseCases } from './application/use-cases';
import type { CharactersUseCases } from './types';

const provideCharactersUseCases = (): CharactersUseCases => new DefaultCharactersUseCases(new OutputHttpAdapter());

export async function CharactersPage() {
	const useCases: CharactersUseCases = provideCharactersUseCases();
	await useCases.fetchCharacters();

	return (
		<div className={'characters-page'}>
			<SearchForm results={useCases.characters.length} />
			<div className={'characters-page__list'}>
				{useCases.characters.map(item => (
					<CharacterCard
						key={`character-${item.$id}`}
						id={item.$id}
						name={item.name}
						image={item.image}
						isFavourite={item.isFavourite}
					/>
				))}
			</div>
		</div>
	);
}
