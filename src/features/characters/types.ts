export namespace CharactersTypes {
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
}

export interface CharactersPorts {
	fetchCharacters(input: CharactersTypes.FetchCharactersPortInput): Promise<CharactersTypes.Character[]>;
}

export interface CharactersUseCases {
	characters: CharactersTypes.Character[];
	fetchCharacters(input: CharactersTypes.FetchCharactersUseCaseInput): Promise<void>;
}
