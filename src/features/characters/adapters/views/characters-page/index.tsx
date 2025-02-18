import './styles.sass';
import { useCallback, useEffect, useState } from 'react';
import { toggleLoading, useAppDispatch, useAppSelector } from '../../../../../app/store';
import { Alert, CharacterCard, GridLayout, SearchForm } from '../../../../../components';
import { provideCharactersUseCases } from '../../../graph.ts';
import { storeCharacters } from '../../../store';
import type { CharactersTypes, CharactersUseCases } from '../../../types.ts';

export function CharactersPage() {
	const dispatch = useAppDispatch();
	const isLoading: boolean = useAppSelector(state => state.loading.value);
	const favourites: number[] = useAppSelector(state => state.favourites.value);
	const characters: CharactersTypes.Character[] = useAppSelector(state => state.characters.items);
	const filterByFavourites: boolean = useAppSelector(state => state.favourites.filterByFavourites);
	const [useCases /*, setUseCases*/] = useState<CharactersUseCases>(provideCharactersUseCases());
	const [searchValue, setSearchValue] = useState<string>('');

	const loadCharacters = useCallback(async (): Promise<void> => {
		dispatch(toggleLoading(true));
		const fetchCharactersUseCaseInput: CharactersTypes.FetchCharactersUseCaseInput = {};
		if (searchValue) {
			fetchCharactersUseCaseInput.name = searchValue;
		}
		await useCases?.fetchCharacters(fetchCharactersUseCaseInput);
		dispatch(toggleLoading(false));
	}, [dispatch, searchValue, useCases]);

	useEffect(() => {
		let ignore: boolean = characters.length !== 0;

		(async () => {
			if (!ignore) {
				await loadCharacters();
				dispatch(storeCharacters(useCases.characters));
			}
		})();

		return () => {
			ignore = true;
		};
	}, [characters, useCases, loadCharacters, dispatch]);

	const onSearch = async (name: string): Promise<void> => {
		setSearchValue(name);
		dispatch(storeCharacters([]));
		dispatch(toggleLoading(true));
	};

	const charactersToRender = filterByFavourites
		? characters.filter(character => favourites.includes(character.$id))
		: characters;

	return !isLoading ? (
		<div className={'characters-page'}>
			{useCases.lastError ? (
				<Alert type={'error'} message={useCases.lastError} />
			) : (
				<>
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
				</>
			)}
		</div>
	) : (
		<p>CARGANDO ...</p>
	);
}
