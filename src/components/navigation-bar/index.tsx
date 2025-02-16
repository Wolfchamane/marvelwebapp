import './styles.sass';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
// @ts-ignore
import logo from '@/assets/logo.png';
import { toggleFilterByFavourites } from '../../features/favourites/store';
import { FavouriteIcon } from '../favourite-icon';

export function NavigationBar() {
	const dispatch = useDispatch();
	const numOfFavourites: number = useSelector(state => state.favourites.value.length);
	const filterByFavourites: boolean = useSelector(state => state.favourites.filterByFavourites);

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
