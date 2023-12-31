/* eslint-disable indent */
// lib/apollo-provider.js
'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
	NextSSRApolloClient,
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
	const httpLink = new HttpLink({
		uri: 'https://beta.pokeapi.co/graphql/v1beta',
	});

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
