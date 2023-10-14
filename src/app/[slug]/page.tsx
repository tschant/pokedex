import { Suspense } from 'react';
import { dehydrate } from '@tanstack/query-core';
import getQueryClient from '@/utils/getQueryClient';
import PokemonList from '@/components/PokemonList';
import PokemonSearch from '@/components/PokemonSearch';
import Loading from '@/components/Loading';
import Hydrate from '@/utils/hydrate.client';
import { getPokemonList } from '@/utils/getPokemonList';

export interface PaginatedPokemonProps {
	params: { slug: number };
}

const PaginatedPokemonList = async ({ params }: PaginatedPokemonProps) => {
	const page = params.slug;

	const queryClient = getQueryClient();
	await Promise.all([
		queryClient.prefetchQuery(['getPokemonList', 0, 10_000], () =>
			getPokemonList({ page: 0, pageSize: 10_000 }),
		),
		queryClient.prefetchQuery(['getPokemonList', page - 1, 25], () =>
			getPokemonList({ page: page - 1, pageSize: 25 }),
		),
	]);
	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="h-full">
			<Hydrate state={dehydratedState}>
				<Suspense fallback={<Loading className="h-screen" />}>
					<PokemonSearch />
					<PokemonList page={page > 0 ? page : 1} />
				</Suspense>
			</Hydrate>
		</div>
	);
};

export default PaginatedPokemonList;
