import './styles.sass';
import { Link } from 'react-router';
import logo from '@/assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toggleFilterByFavourites } from '../../features/favourites/store';
import { FavouriteIcon } from '../favourite-icon';

export function NavigationBar() {
	const dispatch = useAppDispatch();
	const numOfFavourites: number = useAppSelector(state => state.favourites.value.length);
	const filterByFavourites: boolean = useAppSelector(state => state.favourites.filterByFavourites);

	const onButtonClick = () => dispatch(toggleFilterByFavourites(!filterByFavourites));

	return (
		<nav className={'navigation-bar'}>
			<ul className={'navigation-bar__menu'}>
				<li>
					<Link to="/">
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
			<span className={'navigation-bar__loader'}></span>
		</nav>
	);
}
