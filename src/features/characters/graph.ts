import { OutputHttpAdapter } from './adapters/http/output.http-adapter.ts';
import { DefaultCharactersUseCases } from './application/use-cases.ts';
import type { CharactersPorts, CharactersUseCases } from './types.ts';

const characterPorts: CharactersPorts = new OutputHttpAdapter();
let useCasesSingleton: CharactersUseCases;

export const provideCharactersUseCases = (): CharactersUseCases => {
	useCasesSingleton = useCasesSingleton || new DefaultCharactersUseCases(characterPorts);

	return useCasesSingleton;
};
