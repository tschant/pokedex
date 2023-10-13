import { useRouter } from 'next/router';
import PokemonDisplay from '@/components/PokemonDisplay';

const SinglePokemonDisplay = () => {
	const { query } = useRouter();
	const { name } = query;

	return <PokemonDisplay pokemon={name} />;
};

export default SinglePokemonDisplay;
