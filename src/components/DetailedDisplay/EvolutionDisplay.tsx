import { useMemo } from 'react';
import { PokemonEvolutionChain, SimplePokemon } from '@/utils/getPokemon';
import SimpleDisplay from '../SimpleDisplay';

export function EvolutionDisplay({
	pokemonEvolutionChain,
}: {
	pokemonEvolutionChain: PokemonEvolutionChain;
}) {
	const sortedSpecies = useMemo(() => {
		return [...pokemonEvolutionChain?.species].sort((a, b) => {
			if (a.evovlesFromId === null) {
				return -1;
			}
			if (a.evovlesFromId === b.id) {
				return 1;
			}

			return 0;
		});
	}, [pokemonEvolutionChain]);
	return (
		<div className={'flex justify-between'}>
			{sortedSpecies?.map(({ name, id, pokemons }) => (
				<SimpleDisplay
					key={id}
					pokemon={
						{
							name,
							id,
							sprites: pokemons[0].sprites,
							types: pokemons[0].types,
						} as SimplePokemon
					}
				/>
			))}
		</div>
	);
}
