export interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

export default function Pagination({
	currentPage,
	totalPages,
}: PaginationProps) {
	return (
		<>
			{currentPage} {totalPages}
		</>
	);
}
