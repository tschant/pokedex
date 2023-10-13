import { ReactNode } from 'react';

export interface BadgeProps {
	color: string;
	className?: string;
	size?: string;
	children: ReactNode;
}

export default function Badge({
	color,
	className,
	size,
	children,
}: BadgeProps) {
	const colorVariants: { [key: string]: string } = {
		default: 'bg-gray-500',
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
			${className ?? ''}
			${colorVariants[color]}
			${size ? 'text-' + size : 'text-xs'}
			m-1
			inline-flex
			items-center
			justify-center
			rounded-md
			px-2
			py-1
			font-medium
			text-white
			ring-1
			ring-inset
	 `}
		>
			{children}
		</div>
	);
}
