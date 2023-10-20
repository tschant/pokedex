import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ApolloWrapper } from '@/utils/apollo-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Pokedex',
	description: 'Simple Pokedex page',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ApolloWrapper>{children}</ApolloWrapper>
			</body>
		</html>
	);
}
