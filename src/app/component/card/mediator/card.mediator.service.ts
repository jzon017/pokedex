import { Injectable } from "@angular/core";
import { PokemonCardComponent } from "../card.component";
import { PokemonDetailEvent } from "./card.mediator";

@Injectable()
export class PokemonDetailMediatorService {
    public readonly detailEvent = new PokemonDetailEvent();
    public readonly cardComponents: Map<string, PokemonCardComponent> = new Map<
        string,
        PokemonCardComponent
    >([]);

    public addComponent(component: PokemonCardComponent): void {
        if(!component.detail){
            throw new Error("No pokemon detail received")
        }

        this.detailEvent.registerPokemon(component);
        this.cardComponents.set(component.detail.name, component);
    }

    public removeComponent(component: PokemonCardComponent): void {
        this.detailEvent.unregisterPokemon(component);
        this.cardComponents.delete(component.detail.name);
    }

    public clearComponentMap(): void {
        this.cardComponents.clear();
    }
}
