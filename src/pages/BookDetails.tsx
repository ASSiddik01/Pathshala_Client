import { useNavigate, useParams } from "react-router-dom";
import Head from "../components/Head";
import {
  useDeleteBookMutation,
  useGetBookQuery,
  useReviewBookMutation,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { IError } from "../types/globalTypes";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppSelector } from "../redux/hooks";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookQuery(id);
  const { token } = useAppSelector((state) => state.auth);
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
  const [
    reviewBook,
    {
      isSuccess: reviewSuccess,
      data: reviewData,
      isError: reviewIsError,
      error: reviewError,
      reset: reviewReset,
    },
  ] = useReviewBookMutation();

  const book = data?.data;
  const reviews = data?.data?.reviews;

  const handleDelete = (id: string | undefined) => {
    deleteBook(id);
  };

  const handleUpdate = (id: string | undefined) => {
    updateBook({ id });
  };

  // review submit
  let formSchema = Yup.object().shape({
    review: Yup.string().required("Review is required"),
  });

  const formik = useFormik({
    initialValues: {
      review: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      if (token) {
        reviewBook({ id, data: values });
        resetForm();
      } else {
        toast.error(`Please login first`);
      }
    },
  });

  useEffect(() => {
    // for delete
    if (deleteSuccess) {
      toast(`${deleteData?.message}`);
      reset();
      navigate("/books", { replace: true });
    } else if (deleteIsError) {
      toast.error((deleteError as IError)?.data.message);
      reset();
    }
    // for update
    if (updateIsError) {
      toast.error((updateError as IError)?.data.message);
      updateReset();
    } else if (updateSuccess) {
      updateReset();
      navigate(`/edit-book/${id}`, { replace: true });
    }
    // for review
    if (reviewSuccess) {
      toast(`${reviewData?.message}`);
      reviewReset();
    } else if (reviewIsError) {
      toast.error((reviewError as IError)?.data.message);
      reviewReset();
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
    updateReset,
    reviewSuccess,
    reviewData,
    reviewIsError,
    reviewError,
    reviewReset,
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
              <div className="bg-base-100 box_shadow p-2">
                <div className="card md:min-h-[300px] md:items-start lg:card-side">
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
                        {book?.author}
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
                      <div className="flex justify-center gap-[15px] mt-[20px]">
                        <button
                          onClick={() => handleUpdate(id)}
                          className="first_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
                        >
                          Edit
                        </button>
                        <label
                          htmlFor="deleteModal"
                          className="second_button duration-300 rounded-full py-[8px] px-[12px] font-medium"
                        >
                          Delete
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Review Part */}
                <div className="p-4">
                  <hr />
                  <h3 className="font-bold text-xl italic my-2">
                    Leave a review
                  </h3>
                  <div className="w-full mb-3">
                    <form onSubmit={formik.handleSubmit}>
                      <textarea
                        className="w-full p-2 mt-1"
                        name="review"
                        id="review"
                        cols={30}
                        placeholder="Write about book"
                        rows={5}
                        onChange={formik.handleChange("review")}
                        value={formik.values.review}
                      ></textarea>
                      {formik.touched.review && formik.errors.review ? (
                        <div className="formik_err text-sm text-red-600">
                          {formik.errors.review}
                        </div>
                      ) : null}
                      <button
                        type="submit"
                        className="second_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>

                {/* User review */}
                <div className="p-4">
                  <hr />
                  <h3 className="font-bold text-xl my-2">
                    User Reviews ({reviews.length})
                  </h3>
                  {reviews?.map(
                    (review: {
                      _id: string;
                      review: string;
                      reviewerId: {
                        firstname: string;
                        lastname: string;
                      };
                    }) => (
                      <div
                        key={review._id}
                        className="flex gap-5 mb-4 border-b"
                      >
                        <div className="user_photo w-1/12">
                          <img
                            className="rounded-full"
                            src="https://i.ibb.co/MgsTCcv/avater.jpg"
                            alt=""
                          />
                        </div>
                        <div className="review_info w-11/12 border-l-2 px-2">
                          <h4 className="text-lg font-bold">{review.review}</h4>
                          <p className="italic text-gray-500">
                            - by {review.reviewerId.firstname}{" "}
                            {review.reviewerId.lastname}{" "}
                          </p>
                        </div>
                      </div>
                    )
                  )}
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
                <div className="flex justify-center gap-[15px] mt-[20px]">
                  <label
                    htmlFor="deleteModal"
                    className="first_button duration-300 rounded-full py-[8px] px-[12px] font-medium"
                  >
                    Cancel
                  </label>
                  <label
                    htmlFor="deleteModal"
                    onClick={() => handleDelete(id)}
                    className="second_button duration-300 rounded-full py-[8px] px-[12px] font-medium "
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
