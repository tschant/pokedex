import { EvolutionChain, EvolutionClient } from 'pokenode-ts';
import { useQuery } from '@tanstack/react-query';

async function getEvolution({ id }: { id: number }) {
	const api = new EvolutionClient();
	return (await api.getEvolutionChainById(id)) as EvolutionChain;
}

export function useGetPokemonEvolution(id: number) {
	return useQuery({
		queryKey: ['getEvolution', id],
		queryFn: () => getEvolution({ id }),
		suspense: true,
	});
}
