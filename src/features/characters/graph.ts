import { OutputHttpAdapter } from './adapters/output.http-adapter';
import { DefaultCharactersUseCases } from './application/use-cases';
import type { CharactersUseCases } from './types';

export const provideCharactersUseCases = (): CharactersUseCases =>
	new DefaultCharactersUseCases(new OutputHttpAdapter());
