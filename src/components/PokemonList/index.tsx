'use client';
import SimpleDisplay from '@/components/SimpleDisplay';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/Pagination';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { UseSuspenseQueryResult, gql } from '@apollo/client';
import {
	PokemonListResponse,
	SimplePokemon,
	pokemonListPagedQuery,
} from '@/utils/getPokemon';

function useGetPokemonList(
	offset: number,
	limit: number,
): UseSuspenseQueryResult<PokemonListResponse> {
	return useSuspenseQuery(pokemonListPagedQuery, {
		variables: {
			offset: (offset - 1) * limit,
			limit,
		},
	});
}

export default function PokemonList({ page }: { page: number }) {
	const router = useRouter();
	const pageSize: number = 25;
	const { data } = useGetPokemonList(page, pageSize);
	const totalPages =
		data?.count?.aggregate?.count >= 0
			? Math.ceil(data?.count?.aggregate?.count / pageSize)
			: 1;

	if (page !== 1 && page > totalPages) {
		router.push(`/${totalPages}`);
		return;
	}

	if (data?.results) {
		return (
			<>
				<div className={'xs:grid-cols-1 grid sm:grid-cols-2 md:grid-cols-5'}>
					{data.results.map((pokemon: SimplePokemon) => (
						<SimpleDisplay pokemon={pokemon} key={pokemon.name} />
					))}
				</div>
				<div className={'mt-5'}>
					<Pagination
						currentPage={page}
						totalPages={totalPages}
						maxToDisplay={4}
					/>
				</div>
			</>
		);
	}

	return <>Error</>;
}
