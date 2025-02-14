import Image from 'next/image';
import heartFilled from '@/assets/heart_filled.png';
import heartEmpty from '@/assets/heart_empty.png';

export interface FavouriteIconProperties {
    filled?: boolean;
}

export function FavouriteIcon({ filled }:FavouriteIconProperties) {
    return <Image src={ filled ? heartFilled : heartEmpty } alt={"Favourite"}/>
}