import { Suspense } from 'react';
import PokemonList from './PokemonList';

export interface PaginatedPokemonProps {
	params: { slug: number };
}

const PaginatedPokemon = async ({ params }: PaginatedPokemonProps) => {
	const page = params.slug;
	return (
		<>
			<Suspense>
				<PokemonList page={page > 0 ? page : 1} />
			</Suspense>
		</>
	);
};

export default PaginatedPokemon;
