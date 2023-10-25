import Image from 'next/image';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { SimplePokemon } from '@/utils/getPokemon';
import { useContext, useMemo } from 'react';
import { getDefaultPokemonSprite } from '../DetailedDisplay/getDefaultPokemonSprite';
import { PokemonHistoryContext } from '@/utils/pokemonHistoryProvider';

export interface PokemonProps {
	pokemon: SimplePokemon;
}

export default function SimpleDisplay({ pokemon }: PokemonProps) {
	const { updateHistory } = useContext(PokemonHistoryContext);
	const defaultSprite = useMemo(
		() => getDefaultPokemonSprite(pokemon.sprites),
		[pokemon],
	);

	return (
		<Link
			onClick={() => updateHistory(pokemon)}
			href={`/pokemon/${pokemon?.name}`}
			className={`
			m-4
			flex
			cursor-pointer
			flex-col
			items-center
			justify-center
			rounded-xl
			border-2
			border-slate-400
			p-6
			drop-shadow-xl
			hover:scale-110
		`}
		>
			{defaultSprite && (
				<Image
					width={100}
					height={100}
					src={defaultSprite}
					alt={pokemon.name + ' sprite'}
				/>
			)}
			<div className={'font-bold'}>N° {pokemon?.id}</div>
			<div className={'text-xl capitalize'}>{pokemon?.name}</div>
			<div>
				{pokemon?.types.map(({ type }, index) => (
					<Badge color={type.name} key={index}>
						{type.name}
					</Badge>
				))}
			</div>
		</Link>
	);
}
