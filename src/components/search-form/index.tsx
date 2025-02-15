'use client';

import { useState } from 'react';
import Form from 'next/form';
import { SearchInput } from '../search-input';

export interface SearchFormProperties {
	results: number;
}

export function SearchForm({ results }: SearchFormProperties) {
	const [search, setSearch] = useState('');

	const handleFormAction = async (e: FormData) => {
		console.log(search);
	};

	const handleInputChange = (value: string): void => setSearch(value);

	return (
		<Form action={handleFormAction}>
			<SearchInput onChange={handleInputChange} />
			<span>{results} resultados</span>
		</Form>
	);
}
