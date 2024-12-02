export class APPokemonResource {
    constructor(
        public readonly name: string,
        public readonly url: string
    ) { }
}

export class APPokemonResourceList {
    constructor(
        public readonly count: number,
        public readonly next: string | null,
        public readonly previous: string | null,
        public readonly results: APPokemonResource[]
    ) { }
}
