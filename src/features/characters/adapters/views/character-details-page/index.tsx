import './styles.sass';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Carrousel, ComicCard, FavouriteIcon } from '../../../../../components';
import { addToFavourites, removeFromFavourites } from '../../../../favourites/store';
import { provideCharactersUseCases } from '../../../graph.ts';
import type { CharactersTypes, CharactersUseCases } from '../../../types.ts';

export function CharacterDetailsPage() {
	const favourites: number[] = useSelector(state => state.favourites.value);
	const dispatch = useDispatch();
	const { id } = useParams();
	const [useCases] = useState<CharactersUseCases>(provideCharactersUseCases());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setIsLoading] = useState<boolean>(true);
	const [character, setCharacter] = useState<CharactersTypes.CharacterDetails | null>(null);
	const [comics, setComics] = useState<CharactersTypes.CharacterComic[]>([]);

	const fetchCharacterDetails = useCallback(async (): Promise<void> => {
		setIsLoading(true);
		await useCases.describeCharacter({ id: id || '' });
		await useCases.listCharacterComics({ id: id || '' });
		setIsLoading(false);
	}, [id, useCases]);

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

	return character ? (
		<section className={'character-details'}>
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
		</section>
	) : (
		<p>Cargando ...</p>
	);
}
