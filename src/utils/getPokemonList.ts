import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts';
import { useQuery } from '@tanstack/react-query';

export async function getPokemonList({
	page,
	pageSize,
}: {
	page: number;
	pageSize: number;
}) {
	const api = new PokemonClient();
	return (await api.listPokemons(
		page * pageSize,
		pageSize,
	)) as NamedAPIResourceList;
}

export function useGetPokemonList(page: number, pageSize: number) {
	return useQuery({
		queryKey: ['getPokemonList', page, pageSize],
		queryFn: () => getPokemonList({ page: page - 1, pageSize }),
		suspense: true,
		retry: false,
	});
}
