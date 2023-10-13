import PokemonDisplay from '@/components/PokemonDisplay';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	router.push('/1');
	return;
}
