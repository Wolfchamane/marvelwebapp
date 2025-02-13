import type { CharactersPorts, CharactersTypes, CharactersUseCases } from '../types';

export class DefaultCharactersUseCases implements CharactersUseCases {
	characters: CharactersTypes.Character[] = [];

	constructor(private readonly ports: CharactersPorts) {}

	async fetchCharacters(): Promise<void> {
		this.characters = (await this.ports.fetchCharacters()).characters;
	}
}
