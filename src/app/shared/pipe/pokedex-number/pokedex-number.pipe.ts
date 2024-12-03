import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "pokedexNumber",
    standalone: true
})
export class PokedexNumberPipe implements PipeTransform {
    public transform(value: number): string {
        const formattedId = value.toString().padStart(4, "0");
        return `#${formattedId}`;
    }
}
