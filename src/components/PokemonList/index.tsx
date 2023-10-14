'use client';
import { Suspense } from 'react';
import SimpleDisplay from '@/components/SimpleDisplay';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/Pagination';
import { useGetPokemonList } from '@/utils/getPokemonList';
import Loading from '@/components/Loading';

export default function PokemonList({ page }: { page: number }) {
	const router = useRouter();
	const pageSize: number = 25;
	const { data } = useGetPokemonList(page, pageSize);
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
						<Suspense fallback={<Loading />} key={name}>
							<SimpleDisplay pokemon={name} />
						</Suspense>
					))}
				</div>
				<div className={'mt-5'}>
					<Pagination
						currentPage={page}
						totalPages={totalPages}
						maxToDisplay={4}
					/>
				</div>
			</>
		);
	}

	return <>Error</>;
}
