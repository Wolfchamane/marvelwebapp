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

export interface HttpClientOutput<T> {
	response: InfraOutput<T> | undefined;
	error?: XHRError;
}

export interface CharactersHttpClient {
	list(input: CharactersListInput): Promise<HttpClientOutput<Character>>;
	describe(input: CharactersDescribeInput): Promise<HttpClientOutput<Character>>;
	listComics(input: CharactersListComicsInput): Promise<HttpClientOutput<Comic>>;
}

export class DefaultCharactersHttpClient extends DefaultXHR implements CharactersHttpClient {
	private _buildOutput<T>(response: InfraOutput<T> | XHRError | undefined): HttpClientOutput<T> {
		return {
			response: response && !('errorCode' in response) ? (response as InfraOutput<T>) : undefined,
			error: response && 'errorCode' in response ? response : undefined,
		};
	}

	async list(input: CharactersListInput): Promise<HttpClientOutput<Character>> {
		return this._buildOutput<Character>(
			await this.fetch<InfraOutput<Character>>('/characters', {
				method: 'GET',
				params: input,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
		);
	}

	async describe(input: CharactersDescribeInput): Promise<HttpClientOutput<Character>> {
		return this._buildOutput<Character>(
			await this.fetch<InfraOutput<Character>>('/characters/{id}', {
				method: 'GET',
				params: input,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
		);
	}

	async listComics(input: CharactersListComicsInput): Promise<HttpClientOutput<Comic>> {
		return this._buildOutput<Comic>(
			await this.fetch<InfraOutput<Comic>>('/characters/{id}/comics', {
				method: 'GET',
				params: input,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
		);
	}
}
