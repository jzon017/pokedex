import { APPokemonStat } from "./APPokemonStat";
import { APPokemonType } from "./APPokemonType";

export class APPokemon implements IPokemon {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly types: APPokemonType[],
        public readonly sprite: string,
        public readonly height: number,
        public readonly weight: number,
        public readonly stats: APPokemonStat[]
    ) { }
}

export interface IPokemon {
    id: number;
    name: string;
    types: APPokemonType[];
    sprite: string;
    height: number;
    weight: number;
    stats: APPokemonStat[];
}
