import { DefaultXHR, type XHRError } from '../../../lib/xhr.ts';
import type { CharactersOutput } from './models.ts';

export interface CharactersListInput {
	limit?: number;
}

export interface CharactersDescribeInput {
	id: string;
}

export interface CharactersHttpClient {
	list(input: CharactersListInput): Promise<CharactersOutput | XHRError | undefined>;
	describe(input: CharactersDescribeInput): Promise<CharactersOutput | XHRError | undefined>;
}

export class DefaultCharactersHttpClient extends DefaultXHR implements CharactersHttpClient {
	list(input: CharactersListInput): Promise<CharactersOutput | XHRError | undefined> {
		return this.fetch<CharactersOutput>('/characters', {
			method: 'GET',
			params: input,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}

	describe(input: CharactersDescribeInput): Promise<CharactersOutput | XHRError | undefined> {
		return this.fetch<CharactersOutput>('/characters/{id}', {
			method: 'GET',
			params: input,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
	}
}
