import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './styles.sass';
import { FavouriteIcon } from '../../components';
import { OutputHttpAdapter } from './adapters/output.http-adapter';
import { DefaultCharacterDetailsUseCases } from './application/use-cases';
import type { CharacterDetailsTypes, CharacterDetailsUseCases } from './types';

const provideCharacterDetailsUseCases = (): CharacterDetailsUseCases =>
	new DefaultCharacterDetailsUseCases(new OutputHttpAdapter());

export * from './route.ts';

export function CharacterDetail() {
	const { id } = useParams();
	const [useCases] = useState<CharacterDetailsUseCases>(provideCharacterDetailsUseCases());
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [character, setCharacter] = useState<CharacterDetailsTypes.Character | null>(null);

	const fetchCharacterDetails = useCallback(async (): Promise<void> => {
		if (!isLoading || character) {
			return;
		}

		debugger;
		await useCases.getCharacterDetails({ id: id || '' });
		debugger;
		setCharacter(useCases.character);
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
				</div>
			</header>
			<main className={'character-details__details'}>
				<article>
					<header>Descripción</header>
					<p className={'character-details__description'}>{character?.description}</p>
				</article>
				<article>
					<header>Detalles</header>
					<ul>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Raza</span>
							<span className={'detail-value'}>{character?.race}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Género</span>
							<span className={'detail-value'}>{character?.gender}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Ki</span>
							<span className={'detail-value'}>{character?.ki}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Max Ki</span>
							<span className={'detail-value'}>{character?.maxKi}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Afiliación</span>
							<span className={'detail-value'}>{character?.affiliation}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Planeta de origen</span>
							<span className={'detail-value'}>{character?.originPlanet.name}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Num. de transformaciones</span>
							<span className={'detail-value'}>{character?.transformations.length}</span>
						</li>
					</ul>
				</article>
			</main>
		</section>
	) : (
		<p>Cargando ...</p>
	);
}
