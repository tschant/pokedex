import Image from 'next/image';

export default function Loading() {
	return (
		<div className="flex h-screen items-center justify-center">
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
