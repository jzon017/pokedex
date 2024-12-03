export class APPokemonStat {
    constructor(
        public readonly base_stat: number,
        public readonly stat: APPokemonStatInfo
    ) { }
}

export class APPokemonStatInfo {
    constructor(
        public readonly name: string
    ) { }
}