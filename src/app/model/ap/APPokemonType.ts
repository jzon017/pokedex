import { PokemonType } from "../enum";

export class APPokemonType {
    constructor(
        public readonly type: APPokemonTypeBase
    ) { }
}

export class APPokemonTypeBase {
    constructor(
        public readonly name: PokemonType
    ) { }
}