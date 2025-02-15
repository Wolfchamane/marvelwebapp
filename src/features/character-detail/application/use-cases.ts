import type {
	CharacterDetailsPorts,
	CharacterDetailsTypes,
	CharacterDetailsUseCases,
} from '@/features/character-detail/types';
import type { Nullable } from '@/lib/nullable';

export class DefaultCharacterDetailsUseCases implements CharacterDetailsUseCases {
	character: Nullable<CharacterDetailsTypes.Character> = null;

	constructor(private readonly ports: CharacterDetailsPorts) {}

	async getCharacterDetails({ id }: CharacterDetailsTypes.GetCharacterDetailsInput): Promise<void> {
		this.character = await this.ports.fetchCharacter({ id });
	}
}
