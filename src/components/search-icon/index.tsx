import '@/styles/lib/_icons.sass';
import searchIcon from '@/assets/search.svg';

export function SearchIcon() {
	return <img src={searchIcon} className={'icon'} alt={'Search'} />;
}
