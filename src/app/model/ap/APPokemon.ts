import { PokemonType } from "../enum/PokemonType";
import { APPokemonStat } from "./APPokemonStat";

export class APPokemon {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly types: PokemonType[],
        public readonly sprite: string,
        public readonly height: string,
        public readonly weight: string,
        public readonly stats: APPokemonStat[]
    ) { }
}
