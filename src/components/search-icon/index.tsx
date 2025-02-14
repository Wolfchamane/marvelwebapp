import '@/styles/lib/_icons.sass';
// @ts-ignore
import searchIcon from '@/assets/search.svg';
import Image from 'next/image';

export function SearchIcon() {
    return <Image src={searchIcon} className={"icon"} alt={"Search"}/>
}