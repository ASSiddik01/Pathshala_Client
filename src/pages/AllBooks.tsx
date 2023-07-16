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
import { booksState } from "../redux/features/book/bookSlice";
import { useAppSelector } from "../redux/hooks";

export default function AllBooks() {
  const [filter, setfilter] = useState(false);
  const { search, books: newBooks } = useAppSelector((state) => state.book);

  const genres = newBooks
    ? [...new Set(newBooks.map((book) => book?.genre))]
    : [];

  const publicationYear = newBooks
    ? [...new Set(newBooks.map((book) => book?.publishedDate))]
    : [];

  const searchLogic = search ? `searchTerm=${search?.searchTerm}` : undefined;
  const { data, isLoading, isSuccess } = useGetBooksQuery(searchLogic);
  const books = data?.data?.data;
  const meta = data?.data?.meta;

  const dispatch = useAppDispatch();

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
                <h4
                  onClick={() => setfilter(!filter)}
                  className="filter_title capitalize"
                >
                  Filter Options
                </h4>
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
                                  id="link-checkbox"
                                  type="checkbox"
                                  value=""
                                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor="link-checkbox"
                                  className="ml-2 "
                                >
                                  {genre}
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
                            {publicationYear?.map((year, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  id="link-checkbox"
                                  type="checkbox"
                                  value=""
                                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor="link-checkbox"
                                  className="ml-2 "
                                >
                                  {year.split("-")[0]}
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
