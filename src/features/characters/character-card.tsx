import Image from 'next/image';

export interface CharacterProperties {
    name: string;
    image: string;
    isFavourite: boolean;
}

export function CharacterCard({name, image, isFavourite}: CharacterProperties){
    return (<div className={"character-card"}>
        <Image src={image} alt={name} width={172.5} height={189.97}/>
        <div className={"character-card__name"}>{ name }</div>
    </div>);
}