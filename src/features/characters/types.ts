export namespace CharactersTypes {
	export interface CharacterComic {
		$id: number;
		title: string;
		image: string;
		year: string;
	}

	export interface CharacterDetails {
		$id: number;
		image: string;
		name: string;
		description: string;
		isFavourite: boolean;
		comics: CharacterComic[];
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
}

export interface CharactersPorts {
	fetchCharacters(input: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[]>;
	describeCharacter(input: CharactersTypes.DescribeCharacterPortInput): Promise<CharactersTypes.CharacterDetails>;
}

export interface CharactersUseCases {
	characters: CharactersTypes.Character[];
	fetchCharacters(input: CharactersTypes.FetchCharactersUseCaseInput): Promise<void>;
	describeCharacter(input: CharactersTypes.DescribeCharacterUseCaseInput): Promise<CharactersTypes.CharacterDetails>;
}
