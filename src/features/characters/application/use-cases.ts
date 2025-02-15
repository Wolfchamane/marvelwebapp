import type { CharactersPorts, CharactersTypes, CharactersUseCases } from '../types';

export class DefaultCharactersUseCases implements CharactersUseCases {
	characters: CharactersTypes.Character[] = [];

	constructor(private readonly ports: CharactersPorts) {}

	async fetchCharacters(input: CharactersTypes.FetchCharactersUseCaseInput): Promise<void> {
		this.characters = await this.ports.fetchCharacters(input);
	}

	async describeCharacter(
		input: CharactersTypes.DescribeCharacterUseCaseInput
	): Promise<CharactersTypes.CharacterDetails> {
		return await this.ports.describeCharacter(input);
	}
}
