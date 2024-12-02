import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";
import { APPokemon } from "../../model";

@Component({
    selector: "pokemon-card-component",
    templateUrl: "card.component.html",
    styleUrl: "card.component.scss",
    standalone: true,
    imports: [CardModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent implements OnInit {
    @Input() detail!: APPokemon;

    public pokemonName(name: string): string {
        return this.detail.name.toUpperCase();
    }

    public pokemonId(id: number): string {
        const formattedId = id.toString().padStart(4, "0");
        return `#${formattedId}`;
    }

    ngOnInit() {}
}
