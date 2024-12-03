export class APPokemonResource implements IPokemonResource {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly image: string
    ) { }
}

export class APPokemonResourceList implements IPokemonResourceList {
    constructor(
        public readonly count: number,
        public readonly next: string | null,
        public readonly previous: string | null,
        public readonly results: APPokemonResource[]
    ) { }
}

export interface IPokemonResource {
    id: number,
    name: string;
    image: string;
}

export interface IPokemonResourceList {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemonResource[];
}