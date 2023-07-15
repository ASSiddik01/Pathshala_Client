import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import {
  useDeleteBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { IError } from "../types/globalTypes";
import { useEffect } from "react";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookQuery(id);
  const [
    deleteBook,
    {
      isSuccess: deleteSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset,
    },
  ] = useDeleteBookMutation();

  const [
    updateBook,
    {
      isSuccess: updateSuccess,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateBookMutation();

  const book = data?.data;

  const handleDelete = (id: string | undefined) => {
    deleteBook(id);
  };

  const handleUpdate = (id: string | undefined) => {
    updateBook({ id });
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast(`${deleteData?.message}`);
      reset();
      navigate("/books", { replace: true });
    } else if (deleteIsError) {
      toast.error((deleteError as IError)?.data.message);
      reset();
    }
    if (updateIsError) {
      toast.error((updateError as IError)?.data.message);
      updateReset();
    } else if (updateSuccess) {
      updateReset();
      navigate(`/edit-book/${id}`, { replace: true });
    }
  }, [
    deleteSuccess,
    deleteData,
    deleteIsError,
    deleteError,
    reset,
    updateIsError,
    updateError,
    updateSuccess,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title={`${book.title} ||`} />
      <div className="">
        <div className="body_wrapper ">
          <div className="layout p-[20px]">
            <div className="p-4 w-full">
              <div className="card md:min-h-[300px] md:items-start lg:card-side bg-base-100 box_shadow p-2">
                <figure className="md:w-[40%]">
                  <img
                    className="object-contain m-auto h-[400px] w-[400px]  "
                    src={book?.bookImgUrl}
                    alt="Album"
                  />
                </figure>
                <div className="md:w-[60%] card-body md:flex justify-center">
                  <h2 className="card-title capitalize ">{book?.title}</h2>
                  <ul className="info_list">
                    <li className="info">
                      <span className="font-bold">Genre: </span>
                      {book?.genre}
                    </li>
                    <li className="info">
                      <span className="font-bold">Author: </span>
                      {book?.genre} {book?.author}
                    </li>
                    <li className="info">
                      <span className="font-bold">Published At: </span>
                      {book?.publishedDate}
                    </li>
                    <li className="info">
                      <span className="font-bold">About Book: </span>
                      {book?.desc}
                    </li>
                  </ul>
                  <div className="card-actions">
                    <div className="flex justify-center gap-[20px] mt-[20px]">
                      <button
                        onClick={() => handleUpdate(id)}
                        className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
                      >
                        Edit
                      </button>
                      <label
                        htmlFor="deleteModal"
                        className="second_button duration-300 rounded-full py-[8px] px-[20px] font-medium"
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <div>
        <input type="checkbox" id="deleteModal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-6/12">
            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 mx-auto">
                <div className="lg:w-full mx-auto">
                  <h3 className="text-red-500">
                    Are you sure to delete{" "}
                    <span className="font-bold italic text-red-500">
                      {book?.title}
                    </span>{" "}
                    book
                  </h3>
                </div>
                <div className="flex justify-center gap-[20px] mt-[20px]">
                  <label
                    htmlFor="deleteModal"
                    className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium"
                  >
                    Cancel
                  </label>
                  <label
                    htmlFor="deleteModal"
                    onClick={() => handleDelete(id)}
                    className="second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
                  >
                    Confirm
                  </label>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
