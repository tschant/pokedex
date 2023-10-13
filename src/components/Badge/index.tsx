import { ReactNode } from 'react';

export interface BadgeProps {
	color: string;
	children: ReactNode;
}

export default function Badge({ color, children }: BadgeProps) {
	const colorVariants: { [key: string]: string } = {
		bug: 'bg-bug',
		dark: 'bg-dark',
		dragon: 'bg-dragon',
		electric: 'bg-electric',
		fairy: 'bg-fairy',
		fighting: 'bg-fighting',
		fire: 'bg-fire',
		flying: 'bg-flying',
		ghost: 'bg-ghost',
		grass: 'bg-grass',
		ground: 'bg-ground',
		ice: 'bg-ice',
		normal: 'bg-normal',
		poison: 'bg-poison',
		psychic: 'bg-psychic',
		rock: 'bg-rock',
		shadow: 'bg-shadow',
		steel: 'bg-steel',
		water: 'bg-water',
	};

	return (
		<div
			className={`
		${colorVariants[color]}
		inline-flex
		items-center
		rounded-md
		px-2
		py-1
		text-xs
		font-medium
		ring-1
		ring-inset
	 `}
		>
			{children}
		</div>
	);
}
