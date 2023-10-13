import { Suspense } from 'react';
import PokemonList from './PokemonList';
import PokemonSearch from '@/components/PokemonSearch';

export interface PaginatedPokemonProps {
	params: { slug: number };
}

const PaginatedPokemonList = async ({ params }: PaginatedPokemonProps) => {
	const page = params.slug;
	return (
		<div className="h-full">
			<Suspense>
				<PokemonSearch />
				<PokemonList page={page > 0 ? page : 1} />
			</Suspense>
		</div>
	);
};

export default PaginatedPokemonList;
