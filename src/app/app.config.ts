import { ApplicationConfig, inject, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app.routes";
import { provideApollo } from "apollo-angular";
import { InMemoryCache } from "@apollo/client/cache";
import { HttpLink } from "apollo-angular/http";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideApollo(() => {
            const httpLink = inject(HttpLink);
            const uri = "https://graphql-pokeapi.graphcdn.app";

            return {
                link: httpLink.create({ uri: uri }),
                cache: new InMemoryCache(),
            };
        }),
    ],
};
