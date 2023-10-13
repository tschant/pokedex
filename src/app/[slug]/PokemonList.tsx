'use client';
import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts';
import PokemonDisplay from '@/components/PokemonDisplay';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/Pagination';

async function getPokemonList({
	page,
	pageSize,
}: {
	page: number;
	pageSize: number;
}) {
	const api = new PokemonClient();
	return (await api.listPokemons(
		page * pageSize,
		pageSize,
	)) as NamedAPIResourceList;
}

export default function PokemonList({ page }: { page: number }) {
	const router = useRouter();
	const pageSize: number = 50;
	const { data } = useQuery({
		queryKey: ['getPokemonList', page, pageSize],
		queryFn: () => getPokemonList({ page: page - 1, pageSize }),
		suspense: true,
	});

	const totalPages =
		data?.count && data?.count >= 0 ? Math.ceil(data?.count / pageSize) : 1;

	if (page !== 1 && page > totalPages) {
		router.push(`/${totalPages}`);
		return;
	}

	if (data?.results) {
		return (
			<>
				<div className={'xs:grid-cols-1 grid sm:grid-cols-2 md:grid-cols-5'}>
					{data.results.map(({ name }: { name: string }) => (
						<PokemonDisplay pokemon={name} key={name} />
					))}
				</div>
				<Pagination currentPage={page} totalPages={totalPages} />
			</>
		);
	}

	return <>Error</>;
}
