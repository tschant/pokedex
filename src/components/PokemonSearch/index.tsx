'use client';
import { useCallback, useContext, useMemo, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { UseSuspenseQueryResult } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getDefaultPokemonSprite } from '@/components/DetailedDisplay/getDefaultPokemonSprite';
import Badge from '@/components/Badge';
import { PokemonHistoryContext } from '@/utils/pokemonHistoryProvider';
import {
	PokemonListResponse,
	SimplePokemon,
	pokemonListPagedQuery,
} from '@/utils/getPokemon';

type SuggestionType = {
	method: string;
	suggestionIndex: number;
	suggestionValue: string;
	suggestion: SimplePokemon;
};

function useGetPokemonList(
	offset: number,
	limit: number,
): UseSuspenseQueryResult<PokemonListResponse> {
	return useSuspenseQuery(pokemonListPagedQuery, {
		variables: {
			offset: offset - 1,
			limit,
		},
	});
}

export default function PokemonSearch() {
	const router = useRouter();
	const [value, setValue] = useState<string>('');
	const [suggestions, setSuggestions] = useState<SimplePokemon[]>([]);
	const { history, updateHistory } = useContext(PokemonHistoryContext);

	// Need to supply page + pageSize, default is first page and max 20 results
	const { data } = useGetPokemonList(1, 10_000);
	const pokemons = useMemo(() => data?.results ?? [], [data]);

	const onChange = (_: any, { newValue }: { newValue: string }) => {
		setValue(newValue);
	};

	const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
		setSuggestions(() => getSuggestions(value));
	};

	const onSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const getSuggestions = useCallback(
		(value: string): SimplePokemon[] => {
			const inputValue = value.trim().toLowerCase();
			const inputLength = inputValue.length;
			if (pokemons && inputLength > 0) {
				return [
					...history,
					...pokemons?.filter(({ name }) => {
						return name.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
					}),
				];
			}

			return history;
		},
		[pokemons, history],
	);

	const onSuggestionSelected = (_: any, value: SuggestionType) => {
		if (value.suggestionValue) {
			updateHistory(value.suggestion);
			router.push(`/pokemon/${value.suggestionValue}`);
		}
	};

	const getSuggestionValue = (suggestion: SimplePokemon) => suggestion.name;

	const shouldRenderSuggestions = (value: string) =>
		value.trim().length > 0 || !!history.length;

	const renderSuggestion = useCallback((pokemon: SimplePokemon) => {
		const defaultSprite = getDefaultPokemonSprite(pokemon.sprites);
		return (
			<div className="flex cursor-pointer border bg-slate-100 p-3 text-black">
				{defaultSprite && (
					<Image
						width={75}
						height={75}
						src={defaultSprite}
						alt={pokemon.name + ' sprite'}
					/>
				)}
				<div className="flex flex-col justify-center">
					<div className={'text-xl capitalize'}>{pokemon?.name}</div>
					<div className="flex flex-row">
						<div>
							{pokemon?.types.map(({ type }, index) => (
								<Badge color={type.name} key={index}>
									{type.name}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}, []);

	if (pokemons.length) {
		return (
			<div className="mb-4 h-8">
				<div className="fixed z-10 flex w-full bg-transparent">
					<Link href="/1" className="m-3" title="Home">
						<Image
							height={24}
							width={24}
							src="/pokeball.svg"
							alt="pokeball homepage"
						/>
					</Link>
					<div className="w-full bg-transparent">
						<Autosuggest
							suggestions={suggestions}
							onSuggestionSelected={onSuggestionSelected}
							onSuggestionsFetchRequested={onSuggestionsFetchRequested}
							onSuggestionsClearRequested={onSuggestionsClearRequested}
							getSuggestionValue={getSuggestionValue}
							renderSuggestion={renderSuggestion}
							shouldRenderSuggestions={shouldRenderSuggestions}
							inputProps={{
								placeholder: 'Search Pokemon',
								value,
								onChange: onChange,
							}}
							theme={{
								container: 'm-2',
								input: 'p-2 bg-gray-300 w-full text-black',
							}}
						/>
					</div>
				</div>
			</div>
		);
	}

	return <div></div>;
}
