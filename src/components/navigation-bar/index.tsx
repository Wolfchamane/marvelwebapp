import Image from 'next/image';
import Link from 'next/link';

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
						{favourites ? (
							<Image src={'/assets/heart_filled.png'} alt={'Favourites'} width={24} height={22} />
						) : (
							<Image src={'/assets/heart_empty.png'} alt={'Favourites'} width={24} height={22} />
						)}
					</Link>
					<span className={'navigation-bar__favourites-text'}>{favourites}</span>
				</li>
			</ul>
			<span className={'navigation-bar__loader'}></span>
		</nav>
	);
}
