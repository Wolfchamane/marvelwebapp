import type { Nullable } from '@/lib/nullable';

export namespace CharacterDetailsTypes {
	export interface OriginPlanet {
		$id: number;
		name: string;
		isDestroyed: boolean;
		description: string;
		image: string;
		deletedAt: Nullable<any>;
	}

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

	export interface CharacterTransformation {
		$id: number;
		name: string;
		image: string;
		ki: string;
		deletedAt: Nullable<any>;
	}

	export interface Character {
		$id: number;
		name: string;
		image: string;
		race: CharacterRace;
		gender: CharacterGender;
		ki: string;
		maxKi: string;
		description: string;
		affiliation: CharacterAffiliation;
		originPlanet: OriginPlanet;
		deletedAt: Nullable<any>;
		transformations: CharacterTransformation[];
		isFavourite: boolean;
	}

	export interface FetchCharacterInput {
		id: string;
	}

	export interface GetCharacterDetailsInput extends FetchCharacterInput {}
}

export interface CharacterDetailsPorts {
	fetchCharacter(input: CharacterDetailsTypes.FetchCharacterInput): Promise<CharacterDetailsTypes.Character>;
}

export interface CharacterDetailsUseCases {
	character: Nullable<CharacterDetailsTypes.Character>;
	getCharacterDetails(input: CharacterDetailsTypes.GetCharacterDetailsInput): Promise<void>;
}
