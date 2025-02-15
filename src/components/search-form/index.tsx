import { useState } from 'react';
import { SearchInput } from '../search-input';

export interface SearchFormProperties {
	results: number;
}

export function SearchForm({ results }: SearchFormProperties) {
	const [search, setSearch] = useState('');

	const handleInputChange = (value: string): void => setSearch(value);

	return (
		<form>
			<SearchInput onChange={handleInputChange} />
			<span>{results} resultados</span>
		</form>
	);
}
