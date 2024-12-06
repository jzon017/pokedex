import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    OnInit,
    Signal,
    signal,
    WritableSignal,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PrimeNGConfig } from "primeng/api";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SkeletonModule } from "primeng/skeleton";
import { combineLatest } from "rxjs";
import { PokemonCardComponent } from "./component/card";
import { PokemonDetailMediatorService } from "./component/card/mediator/card.mediator.service";
import { APPokemon, APPokemonResource, APPokemonResourceList } from "./model";
import { PokemonApiService } from "./service/pokemon.api.service";
import { PokemonService } from "./service/pokemon.service";

@UntilDestroy()
@Component({
    selector: "pokedex-component",
    imports: [
        RouterOutlet,
        PokemonCardComponent,
        SkeletonModule,
        ScrollPanelModule,
    ],
    templateUrl: "./pokedex.component.html",
    styleUrl: "./pokedex.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [PokemonDetailMediatorService, PokemonService],
})
export class PokedexComponent implements OnInit {
    private _loading: WritableSignal<boolean> = signal(false);
    private _pokemons: WritableSignal<APPokemon[]> = signal([]);

    public loading = this._loading.asReadonly();
    public readonly pokemons = this._pokemons.asReadonly();

    private readonly apiService = inject(PokemonApiService);
    private readonly primeNGConfig = inject(PrimeNGConfig);
    private readonly pokemonService = inject(PokemonService);

    public readonly selectedPokemon: Signal<APPokemon> = computed(() => {
        return this.pokemonService.selectedPokemon()[0];
    });

    public ngOnInit(): void {
        this.primeNGConfig.ripple = true;

        this.apiService
            .getPokemons()
            .pipe(untilDestroyed(this))
            .subscribe((pokemonList: APPokemonResourceList) => {
                this._loading.set(true);
                const pokemonRequests = pokemonList.results.map(
                    (resource: APPokemonResource) =>
                        this.apiService.getPokemon(
                            resource.name,
                            resource.image
                        )
                );

                combineLatest(pokemonRequests).subscribe(
                    (pokemons: APPokemon[]) => {
                        this._pokemons.update(() => pokemons);
                        this.pokemonService.selectPokemon(pokemons[0]);
                        this._loading.set(false);
                    }
                );
            });
    }
}
