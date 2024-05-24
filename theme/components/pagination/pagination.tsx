export const Pagination = ({
  currentPage,
  totalPages,
  paginate,
}: {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}) => {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 gap-2">
      {pages.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 border rounded-full transition-colors ${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 hover:bg-blue-100"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
