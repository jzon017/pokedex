import { NgClass, UpperCasePipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from "@angular/core";
import { TooltipModule } from "primeng/tooltip";
import { APPokemonType, PokemonType, PokemonTypeIconMap } from "../../model";

@Component({
    selector: "pokemon-type-component",
    templateUrl: "./type.component.html",
    styleUrl: "./type.component.scss",
    standalone: true,
    imports: [TooltipModule, NgClass, UpperCasePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTypeComponent implements OnInit {
    @Input() public typeInfo!: APPokemonType;

    public get iconPath(): string {
        const typeKey =
            PokemonType[
                this.typeInfo.type.name.toUpperCase() as keyof typeof PokemonType
            ];

        return PokemonTypeIconMap.get(typeKey) || "";
    }

    public ngOnInit(): void {}
}
