import { Suspense } from 'react';
import PokemonSearch from '@/components/PokemonSearch';
import DetailedDisplay from '@/components/DetailedDisplay';

export interface SinglePokemonDisplayProps {
	params: { slug: string };
}

const SinglePokemonDisplay = async ({ params }: SinglePokemonDisplayProps) => {
	const pokemonName = params.slug;
	return (
		<div className="h-full">
			<Suspense>
				<PokemonSearch />
				<DetailedDisplay pokemon={pokemonName} />
			</Suspense>
		</div>
	);
};

export default SinglePokemonDisplay;
