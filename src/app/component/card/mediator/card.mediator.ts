import { APPokemon } from "../../../model";

export interface IPokemonDetailMediator {
    registerPokemon(event: IPokemonDetailEvent): void;
    notify(data: APPokemon): void;
}

export interface IPokemonDetailEvent {
    canRegisterEvent(): boolean;
    skipEventUpdate(): boolean;
    onNotified(data: APPokemon): void;
    remoteEventHandler(event: PokemonDetailEvent): void;
}

export class PokemonDetailEvent implements IPokemonDetailMediator {
    private readonly pokemons: IPokemonDetailEvent[] = [];

    public registerPokemon(event: IPokemonDetailEvent): void {
        this.pokemons.push(event);

        if (event.canRegisterEvent()) {
            event.remoteEventHandler(this);
        }
    }

    public unregisterPokemon(event: IPokemonDetailEvent): void {
        const pokemonIndex = this.pokemons.findIndex((component: IPokemonDetailEvent) => component === event);

        if (pokemonIndex !== -1) {
            this.pokemons.splice(pokemonIndex, 1);
        }
    }

    public notify(data: APPokemon): void {
        for (const pokemon of this.pokemons) {
            if (!pokemon.skipEventUpdate()) {
                pokemon.onNotified(data);
            }
        }
    }
}
