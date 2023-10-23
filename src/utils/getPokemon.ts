import { gql } from '@apollo/client';

export interface NameId {
	name: string;
	id: number;
}

export interface SimplePokemon {
	name: string;
	id: number;
	types: PokemonType[];
	sprites: PokemonSprite[];
}

export interface PokemonListResponse {
	results: SimplePokemon[];
	count: {
		aggregate: {
			count: number;
		};
	};
}

export interface PokemonStat {
	baseStat: number;
	stat: {
		name: string;
	};
}

export interface PokemonType {
	type: {
		name: string;
	};
}

export interface PokemonSprite {
	id: number;
	sprites: string;
}

export interface PokemonAbility {
	ability: NameId;
}

export interface PokemonEvolutionChain {
	species: [
		{ evovlesFromId: number } & NameId & {
				pokemons: [
					{
						sprites: PokemonSprite[];
						types: PokemonType[];
					},
				];
			},
	];
}

export interface DetailedPokemonType {
	name: string;
	id: number;
	pokemons: [
		{
			name: string;
			height: number;
			weight: number;
			stats: PokemonStat[];
			types: PokemonType[];
			sprites: PokemonSprite[];
			abilities: PokemonAbility[];
		},
	];
	evolutionChain: PokemonEvolutionChain;
}
export interface SingleDetailedPokemonResponse {
	results: DetailedPokemonType[];
}

export const singleDetailedPokemonQuery = gql`
	query singlePokemonQuery($name: String) {
		results: pokemon_v2_pokemonspecies(
			where: { name: { _eq: $name } }
			order_by: { id: asc }
			limit: 1
		) {
			name
			id
			pokemons: pokemon_v2_pokemons {
				name
				weight
				height
				stats: pokemon_v2_pokemonstats {
					stat: pokemon_v2_stat {
						name
					}
					baseStat: base_stat
				}
				types: pokemon_v2_pokemontypes {
					type: pokemon_v2_type {
						name
					}
				}
				sprites: pokemon_v2_pokemonsprites {
					id
					sprites
				}
				abilities: pokemon_v2_pokemonabilities {
					ability: pokemon_v2_ability {
						name
						id
					}
				}
			}
			evolutionChain: pokemon_v2_evolutionchain {
				species: pokemon_v2_pokemonspecies {
					name
					id
					evovlesFromId: evolves_from_species_id
					pokemons: pokemon_v2_pokemons {
						sprites: pokemon_v2_pokemonsprites {
							sprites
						}
						types: pokemon_v2_pokemontypes {
							type: pokemon_v2_type {
								name
							}
						}
					}
				}
			}
		}
	}
`;

export const pokemonListPagedQuery = gql`
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
