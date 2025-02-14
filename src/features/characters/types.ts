export namespace CharactersTypes {
	export interface Character {
		$id: number;
		image: string;
		name: string;
		isFavourite: boolean;
	}

	export interface FetchCharactersOutput {
		characters: Character[];
	}
}

export interface CharactersPorts {
	fetchCharacters(): Promise<CharactersTypes.FetchCharactersOutput>;
}

export interface CharactersUseCases {
	characters: CharactersTypes.Character[];
	fetchCharacters(): Promise<void>;
}
