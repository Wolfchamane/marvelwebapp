export namespace CharactersTypes {
	export type CharacterRace =
		| 'Saiyan'
		| 'Namekian'
		| 'Human'
		| 'Majin'
		| 'Frieza Race'
		| 'Jiren Race'
		| 'Android'
		| 'God'
		| 'Angel'
		| 'Evil'
		| 'Unknown'
		| 'Nucleico benigno'
		| 'Nucleico';

	export type CharacterGender = 'Male' | 'Female' | 'Other' | 'Unknown';

	export type CharacterAffiliation =
		| 'Z Fighter'
		| 'Red Ribbon Army'
		| 'Namekian Warrior'
		| 'Freelancer'
		| 'Army of Frieza'
		| 'Other'
		| 'Pride Troopers'
		| 'Assistant of Vermoud'
		| 'Assistant of Beerus'
		| 'Villain';

	export interface CharacterDetail {
		name: string;
		race: CharacterRace;
		gender: CharacterGender;
		ki: string;
		maxKi: string;
		description: string;
		affiliation: CharacterAffiliation;
		originPlanet: string;
	}

	export interface Character {
		$id: number;
		image: string;
		name: string;
		isFavourite: boolean;
		details: CharacterDetail;
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
