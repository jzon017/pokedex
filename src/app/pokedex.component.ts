import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
    WritableSignal
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { combineLatest } from "rxjs";
import { PokemonCardComponent } from "./component/card";
import { APPokemon, APPokemonResource, APPokemonResourceList } from "./model";
import { PokemonApiService } from "./service/pokemon.api.service";

@UntilDestroy()
@Component({
    selector: "pokedex-component",
    imports: [RouterOutlet, PokemonCardComponent],
    templateUrl: "./pokedex.component.html",
    styleUrl: "./pokedex.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokedexComponent implements OnInit {
    private _pokemons: WritableSignal<APPokemon[]> = signal([]);

    public readonly pokemons = this._pokemons.asReadonly();

    private readonly apiService = inject(PokemonApiService);

    public ngOnInit(): void {
        this.apiService
            .getPokemons()
            .pipe(untilDestroyed(this))
            .subscribe((pokemonList: APPokemonResourceList) => {
                const pokemonRequests = pokemonList.results.map(
                    (resource: APPokemonResource) =>
                        this.apiService.getPokemon(resource.name, resource.image)
                );

                combineLatest(pokemonRequests).subscribe(
                    (pokemons: APPokemon[]) => {
                        this._pokemons.update(() => pokemons);
                    }
                );
            });
    }
}
