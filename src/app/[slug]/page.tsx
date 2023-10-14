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
	await queryClient.prefetchQuery(['getPokemonList', page, 25], () =>
		getPokemonList({ page, pageSize: 25 }),
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="h-full">
			<PokemonSearch />
			<Hydrate state={dehydratedState}>
				<Suspense fallback={<Loading className="h-screen" />}>
					<PokemonList page={page > 0 ? page : 1} />
				</Suspense>
			</Hydrate>
		</div>
	);
};

export default PaginatedPokemonList;
