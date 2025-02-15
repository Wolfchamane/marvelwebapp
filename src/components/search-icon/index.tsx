import '@/styles/lib/_icons.sass';
// @ts-ignore
import searchIcon from '@/assets/search.svg';

export function SearchIcon() {
	return <img src={searchIcon} className={'icon'} alt={'Search'} />;
}
