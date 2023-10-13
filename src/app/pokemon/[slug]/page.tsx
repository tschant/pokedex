import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PokemonSearch from '@/components/PokemonSearch';
import DetailedDisplay from '@/components/DetailedDisplay';
import Loading from '@/components/Loading';

export interface SinglePokemonDisplayProps {
	params: { slug: string };
}

const SinglePokemonDisplay = async ({ params }: SinglePokemonDisplayProps) => {
	const pokemonName = params.slug;
	return (
		<div className="h-full">
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
		</div>
	);
};

export default SinglePokemonDisplay;
