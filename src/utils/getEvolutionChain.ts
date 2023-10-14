import { EvolutionChain, EvolutionClient } from 'pokenode-ts';
import { useQuery } from '@tanstack/react-query';

export async function getEvolutionChain({ id }: { id: number }) {
	const api = new EvolutionClient();
	return (await api.getEvolutionChainById(id)) as EvolutionChain;
}

export function useGetPokemonEvolution(id: number) {
	return useQuery({
		queryKey: ['getEvolution', id],
		queryFn: () => getEvolutionChain({ id }),
		suspense: true,
	});
}
