import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './character-details.styles.sass';
import { FavouriteIcon } from '../../../../components';
import { provideCharactersUseCases } from '../../graph.ts';
import type { CharactersTypes, CharactersUseCases } from '../../types.ts';

export function CharacterDetailsPage() {
	const { id } = useParams();
	const [useCases] = useState<CharactersUseCases>(provideCharactersUseCases());
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [character, setCharacter] = useState<CharactersTypes.CharacterDetails | null>(null);

	const fetchCharacterDetails = useCallback(async (): Promise<void> => {
		if (!isLoading || character) {
			return;
		}

		setCharacter(await useCases.describeCharacter({ id: id || '' }));
		setIsLoading(false);
	}, [id, isLoading, character]);

	useEffect(() => {
		fetchCharacterDetails();
	}, [fetchCharacterDetails]);

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
						<FavouriteIcon filled={character?.isFavourite} />
					</div>
					<p className={'character-details__description'}>{character?.description}</p>
				</div>
			</header>
		</section>
	) : (
		<p>Cargando ...</p>
	);
}
