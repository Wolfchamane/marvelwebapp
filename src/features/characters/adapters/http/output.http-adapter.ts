import type { XHRError } from '../../../../lib/xhr.ts';
import {
	type Character,
	CharactersHttpClient,
	CharactersListComicsInput,
	CharactersListInput,
	type Comic,
	type InfraOutput,
} from '../../infra';
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

	private _mapResponseToOutput(response: InfraOutput<Character>): CharactersTypes.Character[] {
		const { data } = response;
		const { results } = data;

		return results.map(this._mapItemToCharacter.bind(this));
	}

	async fetchCharacters({
		name,
	}: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[] | XHRError | undefined> {
		const params: CharactersListInput = { limit: 50 };
		if (name) {
			params.name = name;
		}

		const response: InfraOutput<Character> | XHRError | undefined = await this.httpClient.list(params);

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
		const response: InfraOutput<Character> | XHRError | undefined = await this.httpClient.describe({ id });

		return response && 'data' in response && 'results' in response.data
			? this._mapDetailResponseToApplication(response.data.results[0])
			: response && 'errorMessage' in response
				? (response as XHRError)
				: undefined;
	}

	private _mapCharacterComicToApplication(comic: Comic): CharactersTypes.CharacterComic {
		const onSaleDate = comic.dates.find(date => date.type === 'onsaleDate');

		return {
			$id: comic.id,
			title: comic.title,
			year: onSaleDate ? new Date(onSaleDate.date) : null,
			image: [comic.thumbnail.path, comic.thumbnail.extension].join('.'),
		};
	}

	private _mapCharacterComicsToApplication(comics: Comic[]): CharactersTypes.CharacterComic[] {
		return comics.map(this._mapCharacterComicToApplication.bind(this));
	}

	async listCharacterComics({
		id,
	}: CharactersTypes.ListCharacterComicsPortInput): Promise<CharactersTypes.CharacterComic[] | XHRError | undefined> {
		const params: CharactersListComicsInput = {
			limit: 20,
			id,
		};

		const response: InfraOutput<Comic> | XHRError | undefined = await this.httpClient.listComics(params);

		return response && 'data' in response && 'results' in response.data
			? this._mapCharacterComicsToApplication(response.data.results)
			: response && 'errorCode' in response
				? (response as XHRError)
				: response;
	}
}
