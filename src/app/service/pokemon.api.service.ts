import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";

import { APPokemon, APPokemonResourceList } from "../model";

@Injectable({ providedIn: "root" })
export class PokemonApiService {
    private pokemonCache: Map<string, APPokemon> = new Map<string, APPokemon>([]);

    constructor(private readonly httpClient: HttpClient) {}

    public getPokemons(
        perPage: number = 25,
        page: number = 1
    ): Observable<APPokemonResourceList> {
        const offset = perPage * (page - 1);

        return this.httpClient.get<APPokemonResourceList>(
            "https://pokeapi.co/api/v2/pokemon",
            {
                params: {
                    limit: perPage,
                    offset: offset,
                },
            }
        );
    }

    public getPokemon(id: string): Observable<APPokemon> {
        if (this.pokemonCache.has(id)) {
            return of(this.pokemonCache.get(id) as APPokemon);
        }

        return this.httpClient
            .get<APPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .pipe(
                map((pokemon: APPokemon) => {
                    this.pokemonCache.set(pokemon.name, pokemon);
                    return pokemon;
                })
            );
    }
}
