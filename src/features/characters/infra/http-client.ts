import { DefaultXHR, type XHRError } from '../../../lib/xhr.ts';
import type { Character, Comic, InfraOutput } from './models.ts';

export interface CharactersListInput {
	limit?: number;
	name?: string;
}

export interface CharactersDescribeInput {
	id: string;
}

export interface CharactersListComicsInput {
	id: string;
	limit?: number;
}

export interface CharactersHttpClient {
	list(input: CharactersListInput): Promise<InfraOutput<Character> | XHRError | undefined>;
	describe(input: CharactersDescribeInput): Promise<InfraOutput<Character> | XHRError | undefined>;
	listComics(input: CharactersListComicsInput): Promise<InfraOutput<Comic> | XHRError | undefined>;
}

export class DefaultCharactersHttpClient extends DefaultXHR implements CharactersHttpClient {
	list(input: CharactersListInput): Promise<InfraOutput<Character> | XHRError | undefined> {
		return this.fetch<InfraOutput<Character>>('/characters', {
			method: 'GET',
			params: input,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}

	describe(input: CharactersDescribeInput): Promise<InfraOutput<Character> | XHRError | undefined> {
		return this.fetch<InfraOutput<Character>>('/characters/{id}', {
			method: 'GET',
			params: input,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}

	listComics(input: CharactersListComicsInput): Promise<InfraOutput<Comic> | XHRError | undefined> {
		return this.fetch<InfraOutput<Comic>>('/characters/{id}/comics', {
			method: 'GET',
			params: input,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}
}
