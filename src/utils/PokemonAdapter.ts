import { Pokemon, PokemonClient } from 'pokenode-ts';
import { useQuery } from '@tanstack/react-query';

async function getPokemon({ name }: { name: string }) {
	const api = new PokemonClient();
	return (await api.getPokemonByName(name)) as Pokemon;
}

export function useGetPokemon(name: string) {
	return useQuery({
		queryKey: ['getPokemon', name],
		queryFn: () => getPokemon({ name }),
		suspense: true,
		retry: false,
	});
}
