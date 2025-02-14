import '@/styles/lib/_icons.sass';
import Image from 'next/image';
// @ts-ignore
import searchIcon from '@/assets/search.svg';

export function SearchIcon() {
	return <Image src={searchIcon} className={'icon'} alt={'Search'} />;
}
