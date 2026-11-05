import Button from "./Button";

// paginacja wielokrotnego użytku, zna tylko numery stron i mówi rodzicowi, którą kliknięto
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // nic nie pokazujemy, gdy wszystko mieści się na jednej stronie
  if (totalPages <= 1) return null;

  // [1, 2, 3, ...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Strony wyników">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Poprzednia
      </Button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={page === currentPage ? "page page-active" : "page"}
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Następna
      </Button>
    </nav>
  );
}
