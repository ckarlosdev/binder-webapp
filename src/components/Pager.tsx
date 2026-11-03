import { Pagination } from "react-bootstrap";
import { useIsMobile } from "../hooks/useMediaQuery";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pager({ currentPage, totalPages, onPageChange }: Props) {
  const isMobile = useIsMobile();

  if (totalPages <= 1) return null;

  const pageNumbersToShow = isMobile ? 3 : 5;
  let startPage = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2));
  let endPage = startPage + pageNumbersToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageNumbersToShow + 1);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav className="app-pager" aria-label="Pagination">
      <Pagination>
        <Pagination.Prev
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        />

        {startPage > 1 && (
          <>
            <Pagination.Item onClick={() => goTo(1)}>1</Pagination.Item>
            {startPage > 2 && <Pagination.Ellipsis disabled />}
          </>
        )}

        {pages.map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => goTo(page)}
          >
            {page}
          </Pagination.Item>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <Pagination.Ellipsis disabled />}
            <Pagination.Item onClick={() => goTo(totalPages)}>
              {totalPages}
            </Pagination.Item>
          </>
        )}

        <Pagination.Next
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        />
      </Pagination>
    </nav>
  );
}

export default Pager;
