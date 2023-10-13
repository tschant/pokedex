import Image from 'next/image';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { useGetPokemon } from '@/utils/PokemonAdapter';

export interface PokemonProps {
	pokemon: string;
}

export default function SimpleDisplay({ pokemon }: PokemonProps) {
	const { data } = useGetPokemon(pokemon);

	return (
		<Link
			href={`/pokemon/${data?.name}`}
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
			{data?.sprites?.front_default && (
				<Image
					width={100}
					height={100}
					src={data.sprites.front_default}
					alt={data.name + ' sprite'}
				/>
			)}
			<div className={'font-bold'}>N° {data?.id}</div>
			<div className={'text-xl capitalize'}>{data?.name}</div>
			<div>
				{data?.types.map(({ type }, index) => (
					<Badge color={type.name} key={index}>
						{type.name}
					</Badge>
				))}
			</div>
		</Link>
	);
}
