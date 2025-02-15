import './styles.sass';
import Image from 'next/image';
import { FavouriteIcon } from '@/components/index';
import { OutputHttpAdapter } from './adapters/output.http-adapter';
import { DefaultCharacterDetailsUseCases } from './application/use-cases';
import type { CharacterDetailsUseCases } from './types';

const provideCharacterDetailsUseCases = (): CharacterDetailsUseCases =>
	new DefaultCharacterDetailsUseCases(new OutputHttpAdapter());

export interface CharacterDetailProperties {
	id: string;
}

export async function CharacterDetail({ id }: CharacterDetailProperties) {
	const useCases: CharacterDetailsUseCases = provideCharacterDetailsUseCases();
	await useCases.getCharacterDetails({ id });

	return (
		<section className={'character-details'}>
			<header className={'character-details__resume'}>
				<Image
					className={'character-details__picture'}
					src={useCases.character?.image || ''}
					alt={useCases.character?.name || ''}
					width={320}
					height={320}
				/>
				<div className={'character-details__info'}>
					<div className={'character-details__title'}>
						<span className={'character-details__name'}>{useCases.character?.name}</span>
						<FavouriteIcon filled={useCases.character?.isFavourite} />
					</div>
				</div>
			</header>
			<main className={'character-details__details'}>
				<article>
					<header>Descripción</header>
					<p className={'character-details__description'}>{useCases.character?.description}</p>
				</article>
				<article>
					<header>Detalles</header>
					<ul>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Raza</span>
							<span className={'detail-value'}>{useCases.character?.race}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Género</span>
							<span className={'detail-value'}>{useCases.character?.gender}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Ki</span>
							<span className={'detail-value'}>{useCases.character?.ki}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Max Ki</span>
							<span className={'detail-value'}>{useCases.character?.maxKi}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Afiliación</span>
							<span className={'detail-value'}>{useCases.character?.affiliation}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Planeta de origen</span>
							<span className={'detail-value'}>{useCases.character?.originPlanet.name}</span>
						</li>
						<li className={'detail-item'}>
							<span className={'detail-title'}>Num. de transformaciones</span>
							<span className={'detail-value'}>{useCases.character?.transformations.length}</span>
						</li>
					</ul>
				</article>
			</main>
		</section>
	);
}
