/* eslint-disable @typescript-eslint/no-unused-vars */
import characterThor from '@/../api-spec/mocks/character_thor.json';
import characterThorComics from '@/../api-spec/mocks/character_thor_comics.json';
import charactersJson from '@/../api-spec/mocks/characters.json';
import type { XHRError } from '@/lib/xhr.ts';
import type { Character, Comic, InfraOutput, Thumbnail } from '../../infra';
import type { CharactersPorts, CharactersTypes } from '../../types.ts';

export class MockOutputHttpAdapter implements CharactersPorts {
	constructor() {}

	private _buildThumbnailImage({ path, extension }: Thumbnail): string {
		return [path, extension].join('.').replace(/^http/g, 'https');
	}

	private _mapItemToCharacter(item: Character): CharactersTypes.Character {
		return {
			$id: item.id,
			name: item.name,
			image: this._buildThumbnailImage(item.thumbnail),
			isFavourite: false,
		};
	}

	private _mapResponseToOutput(response: InfraOutput<Character>): CharactersTypes.Character[] {
		const { data } = response;
		const { results } = data;

		return results.map(this._mapItemToCharacter.bind(this));
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

	describeCharacter(
		_: CharactersTypes.DescribeCharacterPortInput
	): Promise<CharactersTypes.CharacterDetails | XHRError> {
		return Promise.resolve(this._mapDetailResponseToApplication(characterThor.data.results[0]));
	}

	fetchCharacters(_: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[] | XHRError> {
		return Promise.resolve(this._mapResponseToOutput(charactersJson));
	}

	listCharacterComics(
		_: CharactersTypes.ListCharacterComicsPortInput
	): Promise<CharactersTypes.CharacterComic[] | XHRError> {
		return Promise.resolve(
			this._mapCharacterComicsToApplication(characterThorComics.data.results as unknown as Comic[])
		);
	}
}
/* eslint-enable @typescript-eslint/no-unused-vars */
