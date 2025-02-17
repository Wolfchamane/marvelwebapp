import './styles.sass';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../app/store';
import { CharacterCard, GridLayout, SearchForm } from '../../../../../components';
import { provideCharactersUseCases } from '../../../graph.ts';
import type { CharactersTypes, CharactersUseCases } from '../../../types.ts';

export function CharactersPage() {
	const favourites: number[] = useAppSelector(state => state.favourites.value);
	const filterByFavourites: boolean = useAppSelector(state => state.favourites.filterByFavourites);
	const [useCases /*, setUseCases*/] = useState<CharactersUseCases>(provideCharactersUseCases());
	const [characters, setCharacters] = useState<CharactersTypes.Character[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setIsLoading] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');

	const loadCharacters = useCallback(async (): Promise<void> => {
		setIsLoading(true);
		const fetchCharactersUseCaseInput: CharactersTypes.FetchCharactersUseCaseInput = {};
		if (searchValue) {
			fetchCharactersUseCaseInput.name = searchValue;
		}
		await useCases?.fetchCharacters(fetchCharactersUseCaseInput);
		setIsLoading(false);
	}, [searchValue, useCases]);

	useEffect(() => {
		let ignore: boolean = false;

		(async () => {
			await loadCharacters();
			if (!ignore) {
				setCharacters(useCases.characters);
			}
		})();

		return () => {
			ignore = true;
		};
	}, [useCases, loadCharacters]);

	const onSearch = async (name: string): Promise<void> => {
		setSearchValue(name);
		setCharacters([]);
		setIsLoading(true);
		await loadCharacters();
		setCharacters(useCases.characters);
		setIsLoading(false);
	};

	const charactersToRender = filterByFavourites
		? characters.filter(character => favourites.includes(character.$id))
		: characters;

	return (
		<div className={'characters-page'}>
			<SearchForm results={charactersToRender.length} onSearch={onSearch} />
			<div className={'characters-page__list'}>
				<GridLayout>
					{charactersToRender.map(item => (
						<CharacterCard
							key={`character-${item.$id}`}
							id={item.$id}
							name={item.name}
							image={item.image}
							isFavourite={(favourites || []).includes(item.$id)}
						/>
					))}
				</GridLayout>
			</div>
		</div>
	);
}
