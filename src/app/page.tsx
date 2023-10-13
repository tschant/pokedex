import { Suspense } from 'react';
import PokemonSearch from '@/components/PokemonSearch';
import PokemonList from '@/components/PokemonList';

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
