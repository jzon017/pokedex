import { UpperCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";
import { APPokemon } from "../../model";
import { PokedexNumberPipe } from "../../shared/pipe/pokedex-number";
import { PokemonTypeComponent } from "../type";

@Component({
    selector: "pokemon-card-component",
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
    standalone: true,
    imports: [CardModule, UpperCasePipe, PokedexNumberPipe, PokemonTypeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent implements OnInit {
    @Input() detail!: APPokemon;

    public ngOnInit(): void {
    }
}
