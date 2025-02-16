import './styles.sass';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Carrousel, ComicCard, FavouriteIcon } from '../../../../../components';
import { provideCharactersUseCases } from '../../../graph.ts';
import type { CharactersTypes, CharactersUseCases } from '../../../types.ts';
import { useDispatch } from 'react-redux'
import { addToFavourites, removeFromFavourites, addToFavouritesAction, removeFromFavouritesAction } from "../../../../favourites/store";

export function CharacterDetailsPage() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [useCases] = useState<CharactersUseCases>(provideCharactersUseCases());
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [character, setCharacter] = useState<CharactersTypes.CharacterDetails | null>(null);
	const [comics, setComics] = useState<CharactersTypes.CharacterComic[]>([]);

	const fetchCharacterDetails = useCallback(async (): Promise<void> => {
		if (!isLoading || character) {
			return;
		}

		await useCases.describeCharacter({ id: id || '' });
		await useCases.listCharacterComics({ id: id || '' });
		setCharacter(useCases.character);
		setComics(useCases.comics);
		setIsLoading(false);
	}, [id, isLoading, character, comics]);

	useEffect(() => {
		fetchCharacterDetails();
	}, [fetchCharacterDetails]);

	const onClick = () => {
		if (character && character.isFavourite) {
			dispatch(removeFromFavourites(removeFromFavouritesAction(character.$id)));
			setCharacter({ ...character, isFavourite: false });
		}

		if (character && !character.isFavourite) {
			dispatch(addToFavourites(addToFavouritesAction(character.$id)));
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
						<button onClick={onClick}><FavouriteIcon filled={character?.isFavourite} /></button>
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
