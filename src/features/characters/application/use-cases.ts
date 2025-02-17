import { Nullable } from '../../../lib/nullable.ts';
import { XHRError } from '../../../lib/xhr.ts';
import type { CharactersPorts, CharactersTypes, CharactersUseCases } from '../types';

export class DefaultCharactersUseCases implements CharactersUseCases {
	characters: CharactersTypes.Character[] = [];
	character: Nullable<CharactersTypes.CharacterDetails> = null;
	comics: CharactersTypes.CharacterComic[] = [];
	lastError: Nullable<string> = null;

	constructor(private readonly ports: CharactersPorts) {}

	async fetchCharacters(input: CharactersTypes.FetchCharactersUseCaseInput): Promise<void> {
		const response: CharactersTypes.Character[] | XHRError | undefined = await this.ports.fetchCharacters(input);
		if (response && 'errorCode' in response) {
			this.lastError = `ERROR: ${response.errorMessage}`;
		} else if (!response) {
			this.characters = [];
		} else {
			this.characters = response;
		}
	}

	async describeCharacter(input: CharactersTypes.DescribeCharacterUseCaseInput): Promise<void> {
		const response: CharactersTypes.CharacterDetails | XHRError | undefined =
			await this.ports.describeCharacter(input);

		if (response && !('errorCode' in response) && !('errorMessage' in response)) {
			this.character = response;
		} else if (response && 'errorCode' in response) {
			this.lastError = `ERROR: ${response.errorMessage}`;
		} else {
			this.character = null;
		}
	}

	async listCharacterComics(input: CharactersTypes.ListCharacterComicsUseCaseInput): Promise<void> {
		const response: CharactersTypes.CharacterComic[] | XHRError | undefined =
			await this.ports.listCharacterComics(input);
		if (response && 'errorCode' in response) {
			this.comics = [];
			this.lastError = `ERROR: ${response.errorMessage}`;
		} else if (!response) {
			this.comics = [];
		} else {
			this.comics = response;
		}
	}
}
