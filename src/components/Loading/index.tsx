import Image from 'next/image';

export interface LoadingProps {
	className?: string;
}

export default function Loading({ className }: LoadingProps) {
	return (
		<div className={`flex items-center justify-center ${className ?? ''}`}>
			<Image
				alt="pokeball loading image"
				height={200}
				width={200}
				src="/pokeball.svg"
				className="animate-spin"
			/>
		</div>
	);
}
