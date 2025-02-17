import { MockOutputHttpAdapter } from './adapters/http/mock.output.http-adapter.ts';
import { OutputHttpAdapter } from './adapters/http/output.http-adapter.ts';
import { DefaultCharactersUseCases } from './application/use-cases.ts';
import { type CharactersHttpClient, DefaultCharactersHttpClient } from './infra';
import type { CharactersPorts, CharactersUseCases } from './types.ts';

const httpClient: CharactersHttpClient = new DefaultCharactersHttpClient();
const characterPorts: CharactersPorts = new OutputHttpAdapter(httpClient);
const mockCharactersPorts: CharactersPorts = new MockOutputHttpAdapter();
let useCasesSingleton: CharactersUseCases;

export const provideCharactersUseCases = (): CharactersUseCases => {
	useCasesSingleton = useCasesSingleton || new DefaultCharactersUseCases(__IS_PRO__ === 'true' ? characterPorts : mockCharactersPorts);

	return useCasesSingleton;
};
