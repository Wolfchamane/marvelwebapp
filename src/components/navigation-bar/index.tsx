import Image from 'next/image';
import Link from 'next/link';
import './styles.sass';
import { FavouriteIcon } from '@/components/favourite-icon';

export interface NavigationBarProperties {
	favourites?: number;
	loading?: boolean;
}

export function NavigationBar({ favourites }: NavigationBarProperties) {
	return (
		<nav className={'navigation-bar'}>
			<ul className={'navigation-bar__menu'}>
				<li>
					<Link href={'/'}>
						<Image src={'/assets/logo.png'} alt={'Marvel Characters'} width={130} height={52} />
					</Link>
				</li>
				<li className={'navigation-bar__empty'}>&nbsp;</li>
				<li className={'navigation-bar__favourites'}>
					<Link href={'/src/app/favourites'}>
						<FavouriteIcon filled={!!favourites} />
					</Link>
					<span className={'navigation-bar__favourites-text'}>{favourites}</span>
				</li>
			</ul>
			<span className={'navigation-bar__loader'}></span>
		</nav>
	);
}
