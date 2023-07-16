import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { setGenre, setYear } from "../redux/features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function BooksSidebar() {
  const { genre: genreState, year: yearState } = useAppSelector(
    (state) => state.book
  );
  const { data } = useGetBooksQuery(undefined);
  const books = data?.data?.data;
  const dispatch = useAppDispatch();

  const genres = books
    ? [...new Set(books.map((book: { genre: string }) => book?.genre))]
    : [];

  const publicationYear = books
    ? [
        ...new Set(
          books.map((book: { publishedDate: string }) => book?.publishedDate)
        ),
      ]
    : [];

  const years = [
    ...new Set(publicationYear.map((year) => (year as string).split("-")[0])),
  ];

  const handleGenre = (e: any) => {
    if (!genreState.includes(e.target.value)) {
      dispatch(setGenre([...genreState, e.target.value]));
    }
  };

  const handleYear = (e: any) => {
    if (!yearState.includes(e.target.value)) {
      dispatch(setYear([...yearState, e.target.value]));
    }
  };
  const handleReset = () => {
    dispatch(setGenre([""]));
    dispatch(setYear([""]));
  };

  return (
    <div>
      <div className="byfilter filter_card bg-white p-[20px] rounded-xl box_shadow">
        <div className="flex justify-between items-start">
          <h4 className="filter_title capitalize">Filter Options</h4>
          <h6
            onClick={() => handleReset()}
            className="text-sm capitalize text-red-500 cursor-pointer"
          >
            reset
          </h6>
        </div>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">By Genere Name</h5>
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              {genres?.map((genre, i) => (
                <div key={i} className="flex items-center">
                  <input
                    id={`genre-${i}`}
                    type="checkbox"
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    checked={genreState.includes(genre as string)}
                    value={genre as string}
                    onChange={(e) => handleGenre(e)}
                  />
                  <label htmlFor={`genre-${i}`} className="ml-2 ">
                    {genre as string}
                  </label>
                </div>
              ))}
            </li>
          </ul>
        </div>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">By Published Year</h5>
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              {years?.map((year, i) => (
                <div key={i} className="flex items-center">
                  <input
                    id={`year-${i}`}
                    type="checkbox"
                    value={year}
                    checked={yearState.includes(year)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    onChange={(e) => handleYear(e)}
                  />
                  <label htmlFor={`year-${i}`} className="ml-2 ">
                    {year}
                  </label>
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
