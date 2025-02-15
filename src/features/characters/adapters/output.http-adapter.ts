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

	private _mapResponseToOutput(response: object | string | undefined | XHRError): CharactersTypes.Character[] {
		return typeof response === 'object' && 'items' in response && Array.isArray(response.items)
			? response.items.map(this._mapItemToCharacter.bind(this))
			: Array.isArray(response)
				? response.map(this._mapItemToCharacter.bind(this))
				: [];
	}

	async fetchCharacters({ name }: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[]> {
		const params: Record<string, any> = { limit: 50 };
		if (name) {
			params.name = name;
		}

		return this._mapResponseToOutput(
			await this.fetch('/characters', {
				method: 'GET',
				params,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
		);
	}
}
