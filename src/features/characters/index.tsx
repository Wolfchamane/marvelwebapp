import './styles.sass';
import { useState, useEffect, useCallback } from 'react';
import { CharacterCard, SearchForm } from '../../components';
import { OutputHttpAdapter } from './adapters/output.http-adapter';
import { DefaultCharactersUseCases } from './application/use-cases';
import type { CharactersUseCases, CharactersTypes } from './types';

const provideCharactersUseCases = (): CharactersUseCases => new DefaultCharactersUseCases(new OutputHttpAdapter());

export * from './route';

export function CharactersPage() {
	const [useCases/*, setUseCases*/] = useState<CharactersUseCases>(provideCharactersUseCases());
	const [ characters, setCharacters ] = useState<CharactersTypes.Character[]>([]);
	const [ isLoading, setIsLoading ] = useState<boolean>(true);

	const loadCharacters = useCallback(async () => {
		if (!isLoading) {
			return;
		}
		await useCases?.fetchCharacters();
		setCharacters(useCases.characters);
		setIsLoading(false);
	}, [ isLoading ]);

	useEffect(() => {
		loadCharacters();
	}, [ loadCharacters ]);

	return (
		<div className={'characters-page'}>
			<SearchForm results={characters.length || 0} />
			<div className={'characters-page__list'}>
				{characters.map(item => (
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
