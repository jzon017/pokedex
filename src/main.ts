import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PokedexComponent } from './app/pokedex.component';

bootstrapApplication(PokedexComponent, appConfig)
  .catch((err) => console.error(err));
