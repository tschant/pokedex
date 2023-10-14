'use client';
import Image from 'next/image';
import Badge from '@/components/Badge';
import { useGetPokemon } from '@/utils/getPokemon';

export default function DetailedDisplay({ pokemon }: { pokemon: string }) {
	const { data } = useGetPokemon(pokemon);
	/* TODO: This is more than take pokemon id and get evolution
		 Need to get pokemon-species -> evolution-chain(url has id)
		// const { data: evolution } = useGetPokemonEvolution(data?.id ?? 0);
	*/
	const totalStats = data?.stats?.reduce(
		(sum, { base_stat }) => sum + base_stat,
		0,
	);

	return (
		<div className="flex flex-col items-center justify-center">
			{data?.sprites?.front_default && (
				<Image
					width={100}
					height={100}
					src={data.sprites.front_default}
					alt={data.name + ' sprite'}
				/>
			)}
			<div className={'font-bold'}>N° {data?.id}</div>
			<div className={'text-xl font-bold capitalize'}>{data?.name}</div>
			<div>
				{data?.types.map(({ type }, index) => (
					<Badge color={type.name} key={index} size="lg">
						{type.name}
					</Badge>
				))}
			</div>

			<div className="my-4 flex flex-row">
				<div className="mx-2 text-center">
					<div className="text-xl font-bold">Height</div>
					<Badge color="default" className="w-48" size="lg">
						<span>{data?.height ? data?.height / 10 : 0}m</span>
					</Badge>
				</div>
				<div className="mx-2 text-center">
					<div className="text-xl font-bold">Weight</div>
					<Badge color="default" className="w-48" size="lg">
						<span>{data?.weight ? data?.weight / 10 : 0}kg</span>
					</Badge>
				</div>
			</div>
			<div className="my-4 text-center">
				<div className="text-xl font-bold">Abilities</div>
				{data?.abilities?.map(({ ability }) => (
					<Badge
						color="default"
						key={ability.name}
						size="lg"
						className="w-48 capitalize"
					>
						{ability.name}
					</Badge>
				))}
			</div>
			<div className="my-4 text-center">
				<div className="text-xl font-bold">Stats</div>
				<div>
					<span className="text-lg font-bold">Total: </span>
					{totalStats}
				</div>
				<div className="grid grid-cols-2">
					{data?.stats?.map(({ base_stat, stat }) => (
						<div className="mx-4 text-left" key={stat.name}>
							<span className="font-bold capitalize">{stat.name}: </span>
							{base_stat}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
