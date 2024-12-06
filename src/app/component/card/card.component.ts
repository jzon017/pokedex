import { NgClass, UpperCasePipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { CardModule } from "primeng/card";
import { RippleModule } from "primeng/ripple";

import { APPokemon } from "../../model";
import { PokemonService } from "../../service/pokemon.service";
import { PokedexNumberPipe } from "../../shared/pipe/pokedex-number";
import { PokemonTypeComponent } from "../type";
import { IPokemonDetailEvent, PokemonDetailEvent } from "./mediator";
import { PokemonDetailMediatorService } from "./mediator/card.mediator.service";

@Component({
    selector: "pokemon-card-component",
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
    standalone: true,
    imports: [
        CardModule,
        RippleModule,
        UpperCasePipe,
        PokedexNumberPipe,
        PokemonTypeComponent,
        NgClass
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent implements IPokemonDetailEvent, OnInit, OnDestroy
{
    @Input({required: true}) public detail!: APPokemon;
    @Input() public isDetailed: boolean = false;

    private eventHandler!: PokemonDetailEvent;

    private readonly mediatorService = inject(PokemonDetailMediatorService);
    private readonly pokemonService = inject(PokemonService);

    public canRegisterEvent(): boolean {
        return !this.isDetailed;
    }

    public skipEventUpdate(): boolean {
        return !this.isDetailed;
    }

    public onNotified(data: APPokemon): void {
        if (!this.isDetailed) {
            throw new Error("Grid cards should not be notified");
        }

        this.detail = structuredClone(data);
    }

    public remoteEventHandler(event: PokemonDetailEvent): void {
        if (this.isDetailed) {
            throw new Error("Expanded card should skip");
        }

        this.eventHandler = event;
    }

    public ngOnInit(): void {
        //TODO: Perform something for eventHandler
        this.mediatorService.addComponent(this);

        // if(!this.isDetailed){
        //     this.eventHandler.notify(this.detail);
        // }
    }

    public selectPokemon(event: Event): void {
        event.stopPropagation();

        this.pokemonService.selectPokemon(this.detail);
    }

    public ngOnDestroy(): void {
        this.mediatorService.removeComponent(this);
    }
}
