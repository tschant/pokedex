'use client';
import Image from 'next/image';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { UseSuspenseQueryResult } from '@apollo/client';
import Badge from '@/components/Badge';
import {
	SingleDetailedPokemonResponse,
	singleDetailedPokemonQuery,
} from '@/utils/getPokemon';
import { useMemo } from 'react';
import { EvolutionDisplay } from './EvolutionDisplay';
import { getDefaultPokemonSprite } from './getDefaultPokemonSprite';

function useGetDetailedPokemon(
	name: string,
): UseSuspenseQueryResult<SingleDetailedPokemonResponse> {
	return useSuspenseQuery(singleDetailedPokemonQuery, {
		variables: {
			name,
		},
	});
}

export default function DetailedDisplay({
	pokemonName,
}: {
	pokemonName: string;
}) {
	const { data } = useGetDetailedPokemon(pokemonName);
	const defaultSprite = useMemo(() => {
		if (data?.results?.length) {
			const pokemon = data.results[0].pokemons[0];
			return getDefaultPokemonSprite(pokemon?.sprites);
		}

		return '';
	}, [data]);

	const pokemon = data?.results[0];
	const pokemonDetails = pokemon?.pokemons[0];
	const pokemonEvolutionChain = pokemon?.evolutionChain;
	const totalStats = useMemo(
		() =>
			pokemon?.pokemons[0]?.stats?.reduce(
				(sum, { baseStat }) => sum + baseStat,
				0,
			),
		[pokemon],
	);

	if (!pokemon) {
		return <div>Not Found</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center">
			{defaultSprite && (
				<Image
					width={100}
					height={100}
					src={defaultSprite}
					alt={pokemon.name + ' sprite'}
				/>
			)}
			<div className={'font-bold'}>N° {pokemon?.id}</div>
			<div className={'text-xl font-bold capitalize'}>{pokemon?.name}</div>
			<div>
				{pokemonDetails.types.map(({ type }, index) => (
					<Badge color={type.name} key={index} size="lg">
						{type.name}
					</Badge>
				))}
			</div>

			<div className="my-4 flex flex-row">
				<div className="mx-2 text-center">
					<div className="text-xl font-bold">Height</div>
					<Badge color="default" className="w-48" size="lg">
						<span>
							{pokemonDetails?.height ? pokemonDetails?.height / 10 : 0}m
						</span>
					</Badge>
				</div>
				<div className="mx-2 text-center">
					<div className="text-xl font-bold">Weight</div>
					<Badge color="default" className="w-48" size="lg">
						<span>
							{pokemonDetails?.weight ? pokemonDetails?.weight / 10 : 0}kg
						</span>
					</Badge>
				</div>
			</div>
			<div className="my-4 text-center">
				<div className="text-xl font-bold">Abilities</div>
				{pokemonDetails?.abilities?.map(({ ability }) => (
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
					{pokemonDetails?.stats?.map(({ baseStat, stat }) => (
						<div className="mx-4 text-left" key={stat.name}>
							<span className="font-bold capitalize">{stat.name}: </span>
							{baseStat}
						</div>
					))}
				</div>
			</div>
			{pokemonEvolutionChain.species.length > 1 && (
				<div className="my-4 text-center">
					<div className="text-xl font-bold">Evolutions</div>
					<EvolutionDisplay pokemonEvolutionChain={pokemonEvolutionChain} />
				</div>
			)}
		</div>
	);
}
