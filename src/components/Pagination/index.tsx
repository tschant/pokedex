import Link from 'next/link';

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	maxToDisplay?: number;
}

export default function Pagination({
	currentPage,
	totalPages,
	maxToDisplay,
}: PaginationProps) {
	const hoverButtonStyles = 'hover:text-black hover:bg-slate-400';
	const inactivePageStyles = 'bg-transparent text-gray-500';
	const activePageStyles = 'text-white bg-gray-500';
	const pageList = [...new Array(totalPages)].map((_, index) => index + 1);
	const minSlicePage = maxToDisplay
		? Math.max(currentPage - maxToDisplay, 1)
		: 1;
	const maxSlicePage = maxToDisplay
		? Math.min(Number(currentPage) + Number(maxToDisplay), totalPages - 1)
		: totalPages;

	return (
		<nav className={'flex items-center justify-center p-4 sm:px-6 lg:px-0'}>
			<ul className="flex">
				<li>
					<Link
						href="/1"
						className={`
							${currentPage === 1 ? activePageStyles : inactivePageStyles}
							mx-1
							flex
							h-9
							w-9
							items-center
							justify-center
							rounded-full
							border
							border-gray-500
							p-0
							text-sm
							transition
							duration-150
							ease-in-out
							${hoverButtonStyles}
						`}
						aria-label={'page 1'}
					>
						<span className="text-sm">{1}</span>
					</Link>
				</li>
				{minSlicePage !== 1 && <span> ... </span>}
				{pageList.slice(minSlicePage, maxSlicePage).map((x) => (
					<li key={x}>
						<Link
							href={`/${x}`}
							className={`
							${Number(currentPage) === x ? activePageStyles : inactivePageStyles}
							mx-1
							flex
							h-9
							w-9
							items-center
							justify-center
							rounded-full
							border
							border-gray-500
							p-0
							text-sm
							transition
							duration-150
							ease-in-out
							hover:bg-white
							${hoverButtonStyles}
						`}
							aria-label={'page ' + x}
						>
							<span className="text-sm">{x}</span>
						</Link>
					</li>
				))}
				{maxSlicePage !== totalPages - 1 && <span> ... </span>}
				<li>
					<Link
						href={`/${totalPages}`}
						className={`
							${currentPage === totalPages ? activePageStyles : inactivePageStyles}
							mx-1
							flex
							h-9
							w-9
							items-center
							justify-center
							rounded-full
							border
							border-gray-500
							p-0
							text-sm
							text-gray-500
							transition
							duration-150
							ease-in-out
							${hoverButtonStyles}
						`}
						aria-label={'page ' + totalPages}
					>
						<span className="text-sm">{totalPages}</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
