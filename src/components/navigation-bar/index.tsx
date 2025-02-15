import './styles.sass';
// @ts-ignore
import logo from '@/assets/logo.png';
import { FavouriteIcon } from '../favourite-icon';

export interface NavigationBarProperties {
	favourites?: number;
	loading?: boolean;
}

export function NavigationBar({ favourites }: NavigationBarProperties) {
	return (
		<nav className={'navigation-bar'}>
			<ul className={'navigation-bar__menu'}>
				<li>
					<a href={'/'}>
						<img src={logo} alt={'Marvel Characters'} width={130} height={52} />
					</a>
				</li>
				<li className={'navigation-bar__empty'}>&nbsp;</li>
				<li className={'navigation-bar__favourites'}>
					<a href={'/src/app/favourites'}>
						<FavouriteIcon filled={!!favourites} />
					</a>
					<span className={'navigation-bar__favourites-text'}>{favourites}</span>
				</li>
			</ul>
			<span className={'navigation-bar__loader'}></span>
		</nav>
	);
}
