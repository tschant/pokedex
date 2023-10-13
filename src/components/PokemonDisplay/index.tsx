import Image from 'next/image';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { useQuery } from '@tanstack/react-query';
import Badge from '../Badge';

export interface PokemonProps {
	pokemon: string;
}

async function getPokemon({ pokemon }: { pokemon: string }) {
	const api = new PokemonClient();
	return (await api.getPokemonByName(pokemon)) as Pokemon;
}

export default function PokemonDisplay({ pokemon }: PokemonProps) {
	const { data } = useQuery({
		queryKey: ['getPokemon', pokemon],
		queryFn: () => getPokemon({ pokemon }),
	});

	return (
		<div className="">
			{data?.sprites?.front_default && (
				<Image
					width={150}
					height={150}
					src={data.sprites.front_default}
					alt={data.name + ' sprite'}
				/>
			)}
			{data?.types.map(({ type }, index) => (
				<Badge color={type.name} key={index}>
					{type.name}
				</Badge>
			))}
			<div>{data?.name}</div>
		</div>
	);
}
