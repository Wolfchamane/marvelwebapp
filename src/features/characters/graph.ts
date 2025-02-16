import { OutputHttpAdapter } from './adapters/http/output.http-adapter.ts';
import { DefaultCharactersUseCases } from './application/use-cases.ts';
import { type CharactersHttpClient, DefaultCharactersHttpClient } from './infra';
import type { CharactersPorts, CharactersUseCases } from './types.ts';

const httpClient: CharactersHttpClient = new DefaultCharactersHttpClient();
const characterPorts: CharactersPorts = new OutputHttpAdapter(httpClient);
let useCasesSingleton: CharactersUseCases;

export const provideCharactersUseCases = (): CharactersUseCases => {
	useCasesSingleton = useCasesSingleton || new DefaultCharactersUseCases(characterPorts);

	return useCasesSingleton;
};
