import { PokemonSprite } from '@/utils/getPokemon';

export function getDefaultPokemonSprite(pokemonSprites: PokemonSprite[]) {
	if (pokemonSprites?.length > 0 && pokemonSprites[0]?.sprites) {
		const parsedSprites = JSON.parse(pokemonSprites[0].sprites);
		if (parsedSprites.front_default) {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/${parsedSprites.front_default.replace(
				'/media',
				'',
			)}`;
		}
	}

	return '';
}
