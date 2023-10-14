'use client';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useGetPokemonList } from '@/utils/getPokemonList';
import { NamedAPIResource } from 'pokenode-ts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type SuggestionType = {
	method: string;
	suggestionIndex: number;
	suggestionValue: string;
	suggestion: NamedAPIResource;
};

export default function PokemonSearch() {
	const router = useRouter();
	const { data: tempQueryForMax } = useGetPokemonList(1, 1); // use this to get MAX pokemons
	const { data } = useGetPokemonList(1, tempQueryForMax?.count ?? 1);
	const [value, setValue] = useState<string>('');
	const [suggestions, setSuggestions] = useState<NamedAPIResource[]>([]);

	const onChange = (_: any, { newValue }: { newValue: string }) => {
		setValue(newValue);
	};

	const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
		setSuggestions(() => getSuggestions(value));
	};

	const onSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const getSuggestions = (value: string): NamedAPIResource[] => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		if (data?.results && inputLength > 0) {
			return data?.results?.filter(({ name }) => {
				const trimmedName = name.toLowerCase().slice(0, inputLength);
				return trimmedName === inputValue;
			});
		}

		return [] as NamedAPIResource[];
	};

	const onSuggestionSelected = (_: any, value: SuggestionType) => {
		if (value.suggestionValue) {
			router.push(`/pokemon/${value.suggestionValue}`);
		}
	};

	const getSuggestionValue = (suggestion: NamedAPIResource) => suggestion.name;
	const renderSuggestion = (suggestion: NamedAPIResource) => (
		<div className="cursor-pointer border bg-slate-100 p-3 text-black">
			{suggestion.name}
		</div>
	);

	if (tempQueryForMax?.count) {
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
