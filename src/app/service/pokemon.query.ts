import { gql } from "apollo-angular";

export const GET_POKEMON = gql`
    query getPokemon($name: String!) {
        pokemon(name: $name) {
            id
            name
            sprites {
                front_default
            }
            height
            weight
            types {
                type {
                    name
                }
            }
            stats {
                stat {
                    name
                }
                base_stat
            }
        }
    }
`;

export const GET_POKEMONS = gql`
    query getPokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            results {
                id
                name
                image
            }
        }
    }
`;
