import { DefaultXHR, type XHRError } from '@/lib/xhr';
import { CharacterDetailsPorts, CharacterDetailsTypes } from '../types';

export class OutputHttpAdapter extends DefaultXHR implements CharacterDetailsPorts {
	private _mapItemToCharacter(item: Record<string, any>): CharacterDetailsTypes.Character {
		return {
			$id: item.id,
			affiliation: item.affiliation,
			deletedAt: item.deletedAt || null,
			description: item.description,
			gender: item.gender,
			image: item.image,
			ki: item.ki,
			maxKi: item.maxKi,
			name: item.name,
			originPlanet: {
				$id: item.originPlanet.id,
				name: item.name,
				isDestroyed: item.isDestroyed,
				description: item.description,
				image: item.image,
				deletedAt: item.deletedAt,
			},
			race: item.race,
			transformations: (item.transformations || []).map((t: Record<string, any>) => ({ ...t, $id: t.id })),
			isFavourite: /goku/gi.test(item.name),
		};
	}

	private _mapResponseToOutput(response: object | string | undefined | XHRError): CharacterDetailsTypes.Character {
		if (typeof response === 'object' && !('code' in response)) {
			return this._mapItemToCharacter(response);
		} else {
			throw new Error('Invalid to parse server response');
		}
	}

	async fetchCharacter({ id }: CharacterDetailsTypes.FetchCharacterInput): Promise<CharacterDetailsTypes.Character> {
		return this._mapResponseToOutput(
			await this.fetch('/characters/{id}', {
				method: 'GET',
				params: { id },
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
		);
	}
}
