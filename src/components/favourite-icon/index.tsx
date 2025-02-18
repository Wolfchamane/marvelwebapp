import heartEmpty from '@/assets/heart_empty.png';
import heartFilled from '@/assets/heart_filled.png';

export interface FavouriteIconProperties {
	filled?: boolean;
}

export function FavouriteIcon({ filled }: FavouriteIconProperties) {
	return <img src={filled ? heartFilled : heartEmpty} alt={'Favourite'} />;
}
