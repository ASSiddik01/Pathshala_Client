import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import BooksSidebar from "../sections/BooksSidebar";
import BooksHeader from "../components/BooksHeader";
import BooksFooter from "../components/BooksFooter";
import BookList from "../sections/BookList";
import { useEffect, useState } from "react";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import Loading from "../components/Loading";
import { useAppDispatch } from "../redux/hooks";
import {
  booksState,
  setGenre,
  setYear,
} from "../redux/features/book/bookSlice";
import { useAppSelector } from "../redux/hooks";

export default function AllBooks() {
  const [filter, setfilter] = useState(false);
  const { search } = useAppSelector((state) => state.book);

  // handle filter state
  const {
    books: allBooks,
    genre: genreState,
    year: yearState,
  } = useAppSelector((state) => state.book);
  // const { data: booksData } = useGetBooksQuery(undefined);
  // const allBooks = booksData?.data?.data;
  const dispatch = useAppDispatch();

  const genres = allBooks
    ? [...new Set(allBooks.map((book: { genre: string }) => book?.genre))]
    : [];

  const publicationYear = allBooks
    ? [
        ...new Set(
          allBooks.map((book: { publishedDate: string }) => book?.publishedDate)
        ),
      ]
    : [];

  const years = [
    ...new Set(publicationYear.map((year) => (year as string).split("-")[0])),
  ];

  const handleGenre = (e: any) => {
    // if (!genreState.includes(e.target.value)) {
    //   console.log(e.target.value);
    dispatch(setGenre(e.target.value));
    // }
  };

  const handleYear = (e: any) => {
    // if (!yearState.includes(e.target.value)) {
    dispatch(setYear(e.target.value));
    // }
  };
  const handleReset = () => {
    dispatch(setGenre(""));
    dispatch(setYear(""));
  };

  let searchLogic = "";

  if (genreState) {
    searchLogic += `genre=${genreState}`;
  }

  if (yearState) {
    searchLogic += `${searchLogic ? "&" : ""}publishedDate=${yearState}`;
  }

  if (search && search.searchTerm) {
    searchLogic += `${searchLogic ? "&" : ""}searchTerm=${search.searchTerm}`;
  }

  // Load and set book

  const { data, isLoading, isSuccess } = useGetBooksQuery(searchLogic);
  const books = data?.data?.data;
  const meta = data?.data?.meta;

  // const sliceGenres = genreState.slice(1);
  // const sliceYears = yearState.slice(1);

  // let newbook = [];
  // const newbook =
  //   books?.filter((book: { genre: string }, i: string | number) =>
  //     sliceGenres[i as number]?.includes(book.genre)
  //   ) || [];

  // let slinewbook = [];
  // for (let i = 0; i < books?.length; i++) {
  //   if (sliceYears[i]?.includes(books[i].publishedDate.split("-")[0])) {
  //     slinewbook.push(books[i]);
  //   }
  // }
  // console.log(slinewbook);

  // const result = books?.filter((item) => item.genre.);

  // console.log(books);
  // console.log(result);
  // console.log(sliceGenres, sliceYears);

  useEffect(() => {
    if (isSuccess) {
      dispatch(booksState({ books, meta }));
    }
  }, [books]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head title="Books ||" />
      <div className="">
        <BreadCrumb title="All Books" />
        <div className="body_wrapper ">
          <div className="flex gap-[20px] layout p-[20px]">
            <div className="filter_options hidden md:block w-[20%] ">
              <BooksSidebar />
            </div>
            <div className="md:w-[80%] w-full">
              <BooksHeader />
              <div className="mobile_filter bolck md:hidden text-center mt-5">
                <div className="flex justify-between items-start">
                  <h4
                    onClick={() => setfilter(!filter)}
                    className="filter_title capitalize"
                  >
                    Filter Options
                  </h4>
                  <h6
                    onClick={() => handleReset()}
                    className="text-sm capitalize text-red-500 cursor-pointer"
                  >
                    reset
                  </h6>
                </div>
                {filter && (
                  <>
                    <div className="sub_filter mb-[15px] bg-white p-[20px] rounded-lg ">
                      <div className="">
                        <h5 className="sub_filter_title">By Genere Name</h5>
                        <ul className="filte_menu">
                          <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
                            {genres?.map((genre, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  id={`genre-${i}`}
                                  type="radio"
                                  name="genre"
                                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                                  // checked={genreState.includes(genre as string)}
                                  checked={genreState === genre}
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
                    </div>
                    <div className="sub_filter mb-[15px] bg-white p-[20px] rounded-lg ">
                      <div className="">
                        <h5 className="sub_filter_title">By Published Year</h5>
                        <ul className="filte_menu">
                          <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
                            {years?.map((year, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  id={`year-${i}`}
                                  type="checkbox"
                                  name="year"
                                  value={year}
                                  checked={yearState === year}
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
                  </>
                )}
              </div>
              <BookList />
              <BooksFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
