import { isPro } from '@/lib/is-pro';
import { MockOutputHttpAdapter } from './adapters/http/mock.output.http-adapter';
import { OutputHttpAdapter } from './adapters/http/output.http-adapter';
import { DefaultCharactersUseCases } from './application/use-cases';
import { type CharactersHttpClient, DefaultCharactersHttpClient } from './infra';
import type { CharactersPorts, CharactersUseCases } from './types';

const httpClient: CharactersHttpClient = new DefaultCharactersHttpClient();
const characterPorts: CharactersPorts = new OutputHttpAdapter(httpClient);
const mockCharactersPorts: CharactersPorts = new MockOutputHttpAdapter();
let useCasesSingleton: CharactersUseCases;

export const provideCharactersUseCases = (): CharactersUseCases => {
	useCasesSingleton =
		useCasesSingleton || new DefaultCharactersUseCases(isPro ? characterPorts : mockCharactersPorts);

	return useCasesSingleton;
};
