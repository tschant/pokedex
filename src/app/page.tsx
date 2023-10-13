'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	router.push('/1');
	return;
}
