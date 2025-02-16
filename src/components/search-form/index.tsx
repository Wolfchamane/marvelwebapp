import './styles.sass';
import { useState } from 'react';
import { SearchInput } from '../search-input';

export interface SearchFormProperties {
	results: number;
	onSearch(text: string): Promise<void>;
}

export function SearchForm({ results, onSearch }: SearchFormProperties) {
	const [search, setSearch] = useState('');

	const handleInputChange = async (value: string): Promise<void> => {
		setSearch(value);
	};

	const onSubmit = async (e: any): Promise<void> => {
		if ('stopPropagation' in e) {
			e.stopPropagation();
			e.preventDefault();
			await onSearch(search);
		}
	};

	return (
		<form className={'search-form'} onSubmit={onSubmit}>
			<SearchInput onChange={handleInputChange} />
			<span className={'search-form__results'}>
				{results >= 2 ? `${results} resultados` : results === 1 ? `${results} resultado` : 'sin resultados'}
			</span>
		</form>
	);
}
