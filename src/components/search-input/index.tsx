import './styles.sass';
import { SearchIcon } from '@/components/search-icon';

export function SearchInput() {
	return (
		<div className={'form-control'}>
			<SearchIcon />
			<input className={'form-input'} type={'text'} placeholder={'Search a character ...'} />
		</div>
	);
}
