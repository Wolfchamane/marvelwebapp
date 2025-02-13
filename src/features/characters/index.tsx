import './styles.sass'
import { DefaultCharactersUseCases } from "./use-cases";
import { OutputHttpAdapter } from "./output.http-adapter";
import { CharacterCard } from './character-card';

export async function CharactersPage() {

    const useCases = new DefaultCharactersUseCases(new OutputHttpAdapter());
    await useCases.fetchCharacters();

    return (<div className={"characters-page"}>
        <form>
            <div>Will be a form here</div>
            <span>{useCases.characters.length} RESULTS</span>
        </form>
        <div className={"characters-page__list"}>
            { useCases.characters.map(item =>
                <CharacterCard key={`character-${item.$id}`} name={item.name} image={item.image} isFavourite={item.isFavourite}/>)}
        </div>
    </div>)
}