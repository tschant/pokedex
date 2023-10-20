import { gql } from '@apollo/client';

export const query = gql`
	query pokemonList($offset: Int, $limit: Int) {
		results: pokemon_v2_pokemonspecies {
			name
			id
			pokemons: pokemon_v2_pokemons(limit: 1) {
				name
				pokemon_v2_pokemonstats {
					pokemon_v2_stat {
						name
					}
					base_stat
				}
				weight
				height
				pokemon_v2_pokemontypes {
					pokemon_v2_type {
						name
					}
				}
				pokemon_v2_pokemonmoves {
					move_id
				}
			}
			pokemon_v2_evolutionchain {
				pokemon_v2_pokemonspecies {
					name
					id
				}
			}
		}
	}
`;
