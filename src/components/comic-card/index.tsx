import './styles.sass';

export interface ComicCardProperties {
	image: string;
	title: string;
	year?: number;
}

export function ComicCard({ image, title, year }: ComicCardProperties) {
	return (
		<div className={'comic-card'}>
			<img className={'comic-card__image'} src={image} width={179.2} alt={title} />
			<span className={'comic-card__title'}>{title}</span>
			<span className={'comic-card__year'}>{year || ''}</span>
		</div>
	);
}
