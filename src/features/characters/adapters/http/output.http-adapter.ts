import type { XHRError } from '../../../../lib/xhr.ts';
import { type Character, CharactersHttpClient, type CharactersOutput } from '../../infra';
import type { CharactersPorts, CharactersTypes } from '../../types.ts';

export class OutputHttpAdapter implements CharactersPorts {
	constructor(private readonly httpClient: CharactersHttpClient) {}

	private _mapItemToCharacter(item: Character): CharactersTypes.Character {
		return {
			$id: item.id,
			name: item.name,
			image: [item.thumbnail.path, item.thumbnail.extension].join('.'),
			isFavourite: false,
		};
	}

	private _mapResponseToOutput(response: CharactersOutput): CharactersTypes.Character[] {
		const { data } = response;
		const { results } = data;

		return results.map(this._mapItemToCharacter.bind(this));
	}

	async fetchCharacters({
		name,
	}: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[] | XHRError | undefined> {
		const params: Record<string, any> = { limit: 50 };
		if (name) {
			params.name = name;
		}

		const response: CharactersOutput | XHRError | undefined = await this.httpClient.list(params);

		return response && 'data' in response ? this._mapResponseToOutput(response) : response;
	}

	private _mapDetailResponseToApplication(item: Character): CharactersTypes.CharacterDetails {
		return {
			$id: item.id,
			name: item.name,
			image: [item.thumbnail.path, item.thumbnail.extension].join('.'),
			description: item.description,
			isFavourite: false,
		} as CharactersTypes.CharacterDetails;
	}

	async describeCharacter({
		id,
	}: CharactersTypes.DescribeCharacterPortInput): Promise<CharactersTypes.CharacterDetails | XHRError | undefined> {
		const response: CharactersOutput | XHRError | undefined = await this.httpClient.describe({ id });

		return response && 'data' in response && 'results' in response.data
			? this._mapDetailResponseToApplication(response.data.results[0])
			: response && 'message' in response
				? (response as XHRError)
				: undefined;
	}
}
