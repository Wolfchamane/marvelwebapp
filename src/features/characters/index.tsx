import './styles.sass';
import { CharacterCard } from '@/components/index';
import { provideCharactersUseCases } from './graph';

export async function CharactersPage() {
	const useCases = provideCharactersUseCases();
	await useCases.fetchCharacters();

	return (
		<div className={'characters-page'}>
			<form>
				<div>Will be a form here</div>
				<span>{useCases.characters.length} RESULTS</span>
			</form>
			<div className={'characters-page__list'}>
				{useCases.characters.map(item => (
					<CharacterCard
						key={`character-${item.$id}`}
						name={item.name}
						image={item.image}
						isFavourite={item.isFavourite}
					/>
				))}
			</div>
		</div>
	);
}
