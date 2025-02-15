import { DefaultXHR } from '../../../../lib/xhr.ts';
import type { Character, CharactersOutput } from '../../infra';
import type { CharactersPorts, CharactersTypes } from '../../types.ts';

export class OutputHttpAdapter extends DefaultXHR implements CharactersPorts {
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

	async fetchCharacters({ name }: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[]> {
		const params: Record<string, any> = { limit: 50 };
		if (name) {
			params.name = name;
		}

		const response = (await this.fetch('/characters', {
			method: 'GET',
			params,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})) as CharactersOutput;

		return this._mapResponseToOutput(response);
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
	}: CharactersTypes.DescribeCharacterPortInput): Promise<CharactersTypes.CharacterDetails> {
		const response = (await this.fetch(`/characters/${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})) as CharactersOutput;

		const { data } = response;
		const { results } = data;

		return this._mapDetailResponseToApplication(results[0]);
	}
}
