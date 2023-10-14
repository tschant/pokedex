import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PokemonSearch from '@/components/PokemonSearch';
import DetailedDisplay from '@/components/DetailedDisplay';
import Loading from '@/components/Loading';
import { getPokemon } from '@/utils/getPokemon';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/query-core';
import Hydrate from '@/utils/hydrate.client';

export interface SinglePokemonDisplayProps {
	params: { slug: string };
}

const SinglePokemonDisplay = async ({ params }: SinglePokemonDisplayProps) => {
	const pokemonName = params.slug;

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['getPokemon', pokemonName], () =>
		getPokemon({ name: pokemonName }),
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="h-full">
			<Hydrate state={dehydratedState}>
				<Suspense fallback={<Loading />}>
					<PokemonSearch />
					<ErrorBoundary
						fallback={
							<div className="mt-48 h-screen text-center text-xl font-bold">
								Pokemon not found
							</div>
						}
					>
						<DetailedDisplay pokemon={pokemonName} />
					</ErrorBoundary>
				</Suspense>
			</Hydrate>
		</div>
	);
};

export default SinglePokemonDisplay;
