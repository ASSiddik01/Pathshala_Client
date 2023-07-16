import { useEffect } from "react";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { toast } from "react-toastify";
import {
  useAddReadlistMutation,
  useAddWishlistMutation,
} from "../redux/features/user/userApi";
import { useNavigate } from "react-router-dom";
import { IError } from "../types/globalTypes";
import Loading from "../components/Loading";

export const Books = () => {
  const { data: bookData, isLoading } = useGetBooksQuery(undefined);
  const books = bookData?.data?.data;
  const [addWishlist, { isSuccess, data, isError, error, reset }] =
    useAddWishlistMutation();
  const navigate = useNavigate();

  const [
    addReadlist,
    {
      isSuccess: readIsSuccess,
      data: readData,
      isError: readisError,
      error: readError,
      reset: readReset,
    },
  ] = useAddReadlistMutation();

  // notification
  useEffect(() => {
    if (isSuccess) {
      toast(`${data?.message}`);
      reset();
    } else if (isError) {
      toast.error((error as IError)?.data.message);
      reset();
    }
    // for add to read list
    if (readIsSuccess) {
      toast(`${readData?.message}`);
      readReset();
    } else if (readisError) {
      toast.error((readError as IError)?.data.message);
      readReset();
    }
  }, [
    data,
    error,
    isError,
    isSuccess,
    reset,
    readIsSuccess,
    readData,
    readisError,
    readError,
    readReset,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-[20px]">
      {/* Section Header */}
      <div className="section_header text-center">
        <p className="text capitalize italic mb--1">Recently added books</p>
        <h1 className="sction_title  font-bold text-5xl capitalize mb-2">
          New Arrivels
        </h1>
        <div className="w-[200px] h-[5px] bg-[#131921] mx-auto mb-2 rounded-full"></div>
      </div>
      {/* Section Body */}
      <div className="container md:py-[30px] pb-[30px]  mx-auto">
        <div className="flex flex-wrap -m-4">
          {books
            .slice(0, 10)
            ?.map(
              (book: {
                _id: string | undefined;
                bookImgUrl: string | undefined;
                title: string | undefined;
                genre: string | undefined;
                author: string | undefined;
                publishedDate: string | undefined;
              }) => (
                <div key={book._id} className="p-4 w-full md:w-1/2">
                  <div className="card md:min-h-[300px] md:items-center relative lg:card-side bg-base-100 box_shadow p-2">
                    <button
                      onClick={() =>
                        addReadlist({ data: { bookId: book._id } })
                      }
                      className="second_button duration-300 rounded-full py-[4px] px-[6px] font-medium absolute right-2 top-2 text-sm"
                    >
                      + Reading
                    </button>
                    <figure className="md:w-[40%]">
                      <img
                        className="object-contain m-auto h-[200px] w-[200px]  "
                        src={book?.bookImgUrl}
                        alt="Album"
                      />
                    </figure>
                    <div className="md:w-[60%] card-body md:flex justify-center">
                      <h2 className="card-title capitalize ">{book?.title}</h2>
                      <ul className="info_list">
                        <li className="info">
                          {" "}
                          <span className="font-bold">Genre: </span>
                          {book?.genre}
                        </li>
                        <li className="info">
                          <span className="font-bold">Author: </span>
                          {book?.author}
                        </li>
                        <li className="info">
                          <span className="font-bold">Published At: </span>
                          {book?.publishedDate}
                        </li>
                      </ul>
                      <div className="card-actions">
                        <div className="flex justify-center gap-[15px] mt-[20px]">
                          <button
                            onClick={() =>
                              addWishlist({ data: { bookId: book._id } })
                            }
                            className="second_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
                          >
                            Wishlist
                          </button>
                          <button
                            onClick={() => navigate(`/books/${book?._id}`)}
                            className="first_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
                          >
                            Show Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};
