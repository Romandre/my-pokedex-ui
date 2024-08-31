const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const pagination = Array.from({ length: pages }, (_, i) => i + 1);

  const handleClick = (i) => {
    setCurrentPage(i);
  };

  return (
    <div className="pagination">
      {pagination.map((i) => {
        return (
          <span
            key={i}
            className={`page-number ${i === currentPage ? "active" : ""}`}
            onClick={() => handleClick(i)}
          >
            {i}
          </span>
        );
      })}
    </div>
  );
};

export default Pagination;
