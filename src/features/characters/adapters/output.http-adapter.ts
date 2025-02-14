import { DefaultXHR, type XHRError } from '../../../lib/xhr';
import { CharactersPorts, CharactersTypes } from '../types';

export class OutputHttpAdapter extends DefaultXHR implements CharactersPorts {
	private _mapItemToCharacter(item: Record<string, any>): CharactersTypes.Character {
		return {
			$id: item.id,
			name: item.name,
			image: item.image,
			isFavourite: false,
		};
	}

	private _mapResponseToOutput(
		response: object | string | undefined | XHRError
	): CharactersTypes.FetchCharactersOutput {
		return {
			characters:
				typeof response === 'object' && 'items' in response && Array.isArray(response.items)
					? response.items.map(this._mapItemToCharacter.bind(this))
					: [],
		};
	}

	async fetchCharacters(): Promise<CharactersTypes.FetchCharactersOutput> {
		return this._mapResponseToOutput(
			await this.fetch('/characters', {
				method: 'GET',
				params: { limit: 50 },
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
		);
	}
}
