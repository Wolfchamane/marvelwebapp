import './styles.sass';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toggleLoading, useAppDispatch, useAppSelector } from '@/app/store';
import { Alert, Carrousel, ComicCard, FavouriteIcon } from '@/components';
import { addToFavourites, removeFromFavourites } from '@/features';
import { provideCharactersUseCases } from '../../../graph';
import type { CharactersTypes, CharactersUseCases } from '../../../types';

export function CharacterDetailsPage() {
	const favourites: number[] = useAppSelector(state => state.favourites.value);
	const isLoading: boolean = useAppSelector(state => state.loading.value);
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const [useCases] = useState<CharactersUseCases>(provideCharactersUseCases());
	const [character, setCharacter] = useState<CharactersTypes.CharacterDetails | null>(null);
	const [comics, setComics] = useState<CharactersTypes.CharacterComic[]>([]);

	const fetchCharacterDetails = useCallback(async (): Promise<void> => {
		dispatch(toggleLoading(true));
		await useCases.describeCharacter({ id: id || '' });
		await useCases.listCharacterComics({ id: id || '' });
		dispatch(toggleLoading(false));
	}, [dispatch, id, useCases]);

	useEffect(() => {
		let ignore: boolean = false;
		(async () => {
			await fetchCharacterDetails();
			if (!ignore) {
				setCharacter(useCases.character);
				setComics(useCases.comics);
			}
		})();
		return () => {
			ignore = true;
		};
	}, [useCases, fetchCharacterDetails]);

	const onClick = () => {
		if (character && character.isFavourite) {
			dispatch(removeFromFavourites(character.$id));
			setCharacter({ ...character, isFavourite: false });
		}

		if (character && !character.isFavourite) {
			dispatch(addToFavourites(character.$id));
			setCharacter({ ...character, isFavourite: true });
		}
	};

	return !isLoading ? (
		<section className={'character-details'}>
			{useCases.lastError ? <Alert type={'error'} message={useCases.lastError} /> : null}
			{!character ? <Alert type={'error'} message={'ERROR: Algo no ha ido bien.'} /> : null}
			{character ? (
				<>
					<header className={'character-details__resume'}>
						<img
							className={'character-details__picture'}
							src={character?.image || ''}
							alt={character?.name || ''}
							width={320}
							height={320}
						/>
						<div className={'character-details__info'}>
							<div className={'character-details__title'}>
								<span className={'character-details__name'}>{character?.name}</span>
								<button onClick={onClick}>
									<FavouriteIcon
										filled={character?.isFavourite || (favourites || []).includes(character.$id)}
									/>
								</button>
							</div>
							<p className={'character-details__description'}>{character?.description}</p>
						</div>
					</header>
					<article className={'character-details__comics'}>
						<header>
							<h1 className={'character-details__comics-title'}>Comics</h1>
						</header>
						<Carrousel>
							{comics.map(comic => (
								<ComicCard
									key={`comic-${comic.$id}`}
									image={comic.image}
									title={comic.title}
									year={comic.year?.getFullYear()}
								/>
							))}
						</Carrousel>
					</article>
				</>
			) : null}
		</section>
	) : (
		<p>CARGANDO ...</p>
	);
}
