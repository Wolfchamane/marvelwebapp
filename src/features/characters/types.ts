import type { Nullable } from '../../lib/nullable.ts';
import type { XHRError } from '../../lib/xhr.ts';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CharactersTypes {
	export interface CharacterComic {
		$id: number;
		title: string;
		image: string;
		year: Nullable<Date>;
	}

	export interface CharacterDetails {
		$id: number;
		image: string;
		name: string;
		description: string;
		isFavourite: boolean;
	}

	export interface Character {
		$id: number;
		image: string;
		name: string;
		isFavourite: boolean;
	}

	export interface FetchCharactersUseCaseInput {
		name?: string;
	}

	export interface FetchCharactersPortInput {
		name?: string;
	}

	export interface DescribeCharacterUseCaseInput {
		id: string;
	}

	export interface DescribeCharacterPortInput {
		id: string;
	}

	export interface ListCharacterComicsPortInput {
		id: string;
	}

	export interface ListCharacterComicsUseCaseInput {
		id: string;
	}
}

export interface CharactersPorts {
	fetchCharacters(input: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[] | XHRError>;
	describeCharacter(
		input: CharactersTypes.DescribeCharacterPortInput
	): Promise<CharactersTypes.CharacterDetails | XHRError>;
	listCharacterComics(
		input: CharactersTypes.ListCharacterComicsPortInput
	): Promise<CharactersTypes.CharacterComic[] | XHRError>;
}

export interface CharactersUseCases {
	characters: CharactersTypes.Character[];
	character: Nullable<CharactersTypes.CharacterDetails>;
	comics: CharactersTypes.CharacterComic[];
	fetchCharacters(input: CharactersTypes.FetchCharactersUseCaseInput): Promise<void>;
	describeCharacter(input: CharactersTypes.DescribeCharacterUseCaseInput): Promise<void>;
	listCharacterComics(input: CharactersTypes.ListCharacterComicsUseCaseInput): Promise<void>;
}
