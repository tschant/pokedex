import Image from 'next/image';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { SimplePokemon } from '@/utils/getPokemonList';
import { useMemo } from 'react';

export interface PokemonProps {
	pokemon: SimplePokemon;
}

export default function SimpleDisplay({ pokemon }: PokemonProps) {
	const defaultSprite = useMemo(() => {
		if (pokemon?.sprites?.length > 0 && pokemon?.sprites[0]?.sprites) {
			const parsedSprites = JSON.parse(pokemon.sprites[0].sprites);
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/${parsedSprites.front_default.replace(
				'/media',
				'',
			)}`;
		}

		return '';
	}, [pokemon]);
	return (
		<Link
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
