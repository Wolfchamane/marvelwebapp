import './styles.sass';
import { useCallback } from 'react';
import { Link } from 'react-router';
import logo from '@/assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toggleFilterByFavourites } from '../../features/favourites/store';
import { FavouriteIcon } from '../favourite-icon';

export function NavigationBar() {
	const dispatch = useAppDispatch();
	const numOfFavourites: number = useAppSelector(state => state.favourites.value.length);
	const filterByFavourites: boolean = useAppSelector(state => state.favourites.filterByFavourites);
	const isLoading: boolean = useAppSelector(state => state.loading.value);

	const onButtonClick = () => dispatch(toggleFilterByFavourites(!filterByFavourites));

	const loaderClassName = useCallback((): string => {
		return ['navigation-bar__loader', isLoading ? 'navigation-bar__loader--animate' : null]
			.filter(Boolean)
			.join(' ');
	}, [isLoading]);

	return (
		<nav className={'navigation-bar'}>
			<ul className={'navigation-bar__menu'}>
				<li>
					<Link to={import.meta.env.VITE_BASE_PATH}>
						<img src={logo} alt={'Marvel Characters'} width={130} height={52} />
					</Link>
				</li>
				<li className={'navigation-bar__empty'}>&nbsp;</li>
				<li className={'navigation-bar__favourites'}>
					<button onClick={onButtonClick}>
						<FavouriteIcon filled={filterByFavourites} />
					</button>
					<span className={'navigation-bar__favourites-text'}>{numOfFavourites}</span>
				</li>
			</ul>
			<span className={loaderClassName()}></span>
		</nav>
	);
}
