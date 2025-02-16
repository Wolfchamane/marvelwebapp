import './styles.sass';
import { useCallback, useEffect, useState } from 'react';
import { CharacterCard, SearchForm } from '../../../../../components';
import { provideCharactersUseCases } from '../../../graph.ts';
import type { CharactersTypes, CharactersUseCases } from '../../../types.ts';

export function CharactersPage() {
	const [useCases /*, setUseCases*/] = useState<CharactersUseCases>(provideCharactersUseCases());
	const [characters, setCharacters] = useState<CharactersTypes.Character[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchValue, setSearchValue] = useState<string>('');

	const loadCharacters = useCallback(async () => {
		if (!isLoading || characters.length) {
			return;
		}

		const fetchCharactersUseCaseInput: CharactersTypes.FetchCharactersUseCaseInput = {};
		if (searchValue) {
			fetchCharactersUseCaseInput.name = searchValue;
		}
		await useCases?.fetchCharacters(fetchCharactersUseCaseInput);
		setCharacters(useCases.characters);
		setIsLoading(false);
	}, [isLoading, characters, searchValue]);

	useEffect(() => {
		loadCharacters();
	}, [loadCharacters]);

	const onSearch = async (name: string): Promise<void> => {
		setIsLoading(true);
		setCharacters([]);
		setSearchValue(name);
	};

	return (
		<div className={'characters-page'}>
			<SearchForm results={characters.length || 0} onSearch={onSearch} />
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
