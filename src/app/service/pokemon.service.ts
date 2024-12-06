import { Injectable, signal, WritableSignal } from "@angular/core";
import { APPokemon } from "../model";

@Injectable()
export class PokemonService {
    private _pokemon: WritableSignal<APPokemon[]> = signal([]);

    public selectedPokemon = this._pokemon.asReadonly();

    public selectPokemon(data: APPokemon): void {
        this._pokemon.update(() => {
            return structuredClone([data]);
        });
    }
}
