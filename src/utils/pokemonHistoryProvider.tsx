'use client';
import { ReactNode, createContext, useState } from 'react';
import { SimplePokemon } from '@/utils/getPokemon';

interface PokemonHistoryContextType {
	history: SimplePokemon[];
	updateHistory: Function;
}
export const MAX_POKEMON_HISTORY = 5;
export const PokemonHistoryContext = createContext<PokemonHistoryContextType>({
	history: [],
	updateHistory: () => ({}),
});

export function PokemonHistoryProvider({ children }: { children: ReactNode }) {
	const [history, setHistory] = useState<SimplePokemon[]>([]);
	const updateHistory = (newPokemon: SimplePokemon) => {
		setHistory(() => [
			newPokemon,
			...history
				.filter((pokemon) => pokemon.name !== newPokemon.name)
				.slice(0, MAX_POKEMON_HISTORY),
		]);
	};

	return (
		<PokemonHistoryContext.Provider value={{ history, updateHistory }}>
			{children}
		</PokemonHistoryContext.Provider>
	);
}
