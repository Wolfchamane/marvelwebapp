import type { XHRError } from '../../../../lib/xhr.ts';
import {
	type Character,
	CharactersHttpClient,
	CharactersListComicsInput,
	CharactersListInput,
	type Comic,
	type HttpClientOutput,
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

	private _mapListCharacterToApplication(response?: InfraOutput<Character>): CharactersTypes.Character[] {
		const { data } = response || {};
		const { results } = data || {};

		return (results || []).map(this._mapItemToCharacter.bind(this));
	}

	async fetchCharacters({
		name,
	}: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[] | XHRError> {
		const params: CharactersListInput = { limit: 50 };
		if (name) {
			params.name = name;
		}

		const { response, error }: HttpClientOutput<Character> = await this.httpClient.list(params);

		return error ? error : this._mapListCharacterToApplication(response);
	}

	private _mapDetailResponseToApplication(item?: Character): CharactersTypes.CharacterDetails {
		return {
			$id: item?.id,
			name: item?.name,
			image: [item?.thumbnail.path, item?.thumbnail.extension].join('.'),
			description: item?.description,
			isFavourite: false,
		} as CharactersTypes.CharacterDetails;
	}

	async describeCharacter({
		id,
	}: CharactersTypes.DescribeCharacterPortInput): Promise<CharactersTypes.CharacterDetails | XHRError> {
		const { response, error }: HttpClientOutput<Character> = await this.httpClient.describe({ id });

		return error ? error : this._mapDetailResponseToApplication(response?.data.results[0]);
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
	}: CharactersTypes.ListCharacterComicsPortInput): Promise<CharactersTypes.CharacterComic[] | XHRError> {
		const params: CharactersListComicsInput = {
			limit: 20,
			id,
		};

		const { response, error }: HttpClientOutput<Comic> = await this.httpClient.listComics(params);

		return error ? error : this._mapCharacterComicsToApplication(response?.data.results || []);
	}
}
