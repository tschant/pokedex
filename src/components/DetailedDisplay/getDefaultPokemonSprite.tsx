import { PokemonSprite } from '@/utils/getPokemon';

export function getDefaultPokemonSprite(pokemonSprites: PokemonSprite[]) {
	if (pokemonSprites?.length > 0 && pokemonSprites[0]?.sprites) {
		const parsedSprites =
			typeof pokemonSprites[0].sprites === 'string'
				? JSON.parse(pokemonSprites[0].sprites)
				: pokemonSprites[0]?.sprites;
		if (parsedSprites.front_default) {
			return `${parsedSprites.front_default}`;
		}
	}

	return '';
}
