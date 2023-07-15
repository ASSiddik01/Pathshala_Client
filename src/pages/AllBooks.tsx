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

export default function AllBooks() {
  const [filter, setfilter] = useState(false);
  const { isSuccess, data, isLoading } = useGetBooksQuery(undefined);
  const books = data?.data?.data;
  const meta = data?.data?.meta;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(booksState({ books, meta }));
    }
  }, [isSuccess]);

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
                  Filter By
                </h4>
                {filter && (
                  <div className="sub_filter mb-[15px] bg-white p-[20px] rounded-lg ">
                    <div className="">
                      <h5 className="sub_filter_title">Filter Name</h5>
                      <ul className="filte_menu">
                        <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
                          <div className="flex items-center">
                            <input
                              id="link-checkbox"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                            />
                            <label htmlFor="link-checkbox" className="ml-2 ">
                              option
                            </label>
                          </div>
                        </li>
                        <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
                          <div className="flex items-center">
                            <input
                              id="link-checkbox"
                              type="checkbox"
                              value=""
                              className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                            />
                            <label htmlFor="link-checkbox" className="ml-2 ">
                              option
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
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
