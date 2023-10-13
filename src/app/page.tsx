import PokemonSearch from '@/components/PokemonSearch';
import PokemonList from './[slug]/PokemonList';
import { Suspense } from 'react';

export default function Home() {
	return (
		<div className="h-full">
			<Suspense>
				<PokemonSearch />
				<PokemonList page={1} />
			</Suspense>
		</div>
	);
}
