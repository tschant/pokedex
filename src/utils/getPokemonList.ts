import { gql } from '@apollo/client';

export interface SimplePokemon {
	name: string;
	id: number;
	types: [
		{
			type: {
				name: string;
			};
		},
	];
	sprites: [
		{
			id: number;
			sprites: string;
		},
	];
}
export interface PokemonListResponse {
	results: SimplePokemon[];
	count: {
		aggregate: {
			count: number;
		};
	};
}

export const query = gql`
	query pokemonList($offset: Int, $limit: Int) {
		results: pokemon_v2_pokemon(
			order_by: { id: asc }
			offset: $offset
			limit: $limit
		) {
			name
			id
			types: pokemon_v2_pokemontypes {
				type: pokemon_v2_type {
					name
				}
			}
			sprites: pokemon_v2_pokemonsprites {
				id
				sprites
			}
		}
		count: pokemon_v2_pokemon_aggregate {
			aggregate {
				count
			}
		}
	}
`;
