import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { Apollo } from "apollo-angular";
import {
    APPokemon,
    APPokemonResourceList,
    IPokemon,
    IPokemonResourceList,
} from "../model";
import { GET_POKEMON, GET_POKEMONS } from "./pokemon.query";

@Injectable({ providedIn: "root" })
export class PokemonApiService {

    constructor(
        private apollo: Apollo
    ) { }

    public getPokemons(
        perPage: number = 25,
        page: number = 1
    ): Observable<APPokemonResourceList> {
        const offset = perPage * (page - 1);

        return this.apollo
            .watchQuery<{ pokemons: IPokemonResourceList }>({
                query: GET_POKEMONS,
                variables: { limit: perPage, offset: offset },
            })
            .valueChanges.pipe(
                map((result) => {
                    const data = result.data;

                    return new APPokemonResourceList(
                        data.pokemons.count,
                        data.pokemons.next,
                        data.pokemons.previous,
                        data.pokemons.results
                    );
                })
            );
    }

    public getPokemon(name: string, image: string): Observable<APPokemon> {
        return this.apollo
            .watchQuery<{ pokemon: IPokemon }>({
                query: GET_POKEMON,
                variables: { name },
            })
            .valueChanges.pipe(
                map((result) => {
                    const data = result.data;

                    return new APPokemon(
                        data.pokemon.id,
                        data.pokemon.name,
                        data.pokemon.types,
                        image,
                        data.pokemon.height,
                        data.pokemon.weight,
                        data.pokemon.stats
                    );
                })
            );
    }
}
