import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IError } from "../types/globalTypes";

export default function AddBook() {
  const [addBook, { isSuccess, data, isError, error, isLoading, reset }] =
    useAddBookMutation();

  // form handle
  let formSchema = Yup.object().shape({
    title: Yup.string().required("Book title is required"),
    author: Yup.string().required("Auther name is required"),
    genre: Yup.string().required("Genre is required"),
    publishedDate: Yup.string().required("Published date is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      author: "",
      genre: "",
      publishedDate: "",
      bookImgUrl: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      addBook(values);
      resetForm();
    },
  });

  // notification
  useEffect(() => {
    if (isSuccess) {
      toast(`${data?.message}`);
      reset();
    } else if (isError) {
      toast.error((error as IError)?.data.message);
      reset();
    }
  }, [data, error, isError, isSuccess, reset]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title="Add Book ||" />
      <div className="">
        <BreadCrumb title="Add New Book" />
        <div className="body_wrapper ">
          <div className="layout lg:w-[1000px] p-5">
            <div className="box_shadow bg-white p-5 rounded-lg">
              <form onSubmit={formik.handleSubmit}>
                <div className="md:flex gap-5">
                  <div className="w-full mb-3">
                    <label htmlFor="title">Book Title</label>
                    <input
                      className="w-full p-2 mb-3 mt-1"
                      type="text"
                      placeholder="Type Book Title"
                      name="title"
                      id="title"
                      onChange={formik.handleChange("title")}
                      value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="formik_err text-sm text-red-600">
                        {formik.errors.title}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full mb-3">
                    <label htmlFor="author">Author</label>
                    <input
                      className="w-full p-2 mb-3 mt-1"
                      type="text"
                      placeholder="Type Author Name"
                      name="author"
                      id="author"
                      onChange={formik.handleChange("author")}
                      value={formik.values.author}
                    />
                    {formik.touched.author && formik.errors.author ? (
                      <div className="formik_err text-sm text-red-600">
                        {formik.errors.author}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="md:flex gap-5">
                  <div className="w-full mb-3">
                    <label htmlFor="genre">Genreric</label>
                    <input
                      className="w-full p-2 mb-3 mt-1"
                      type="text"
                      placeholder="Type Genreric Name ( Ex: Si-fi, Novel, ...) "
                      name="genre"
                      id="genre"
                      onChange={formik.handleChange("genre")}
                      value={formik.values.genre}
                    />
                    {formik.touched.genre && formik.errors.genre ? (
                      <div className="formik_err text-sm text-red-600">
                        {formik.errors.genre}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full mb-3">
                    <label htmlFor="publishedDate">Publication Date</label>
                    <input
                      className="w-full p-2 mb-3 mt-1"
                      type="date"
                      placeholder="Type Publication Date"
                      name="publishedDate"
                      id="publishedDate"
                      onChange={formik.handleChange("publishedDate")}
                      value={formik.values.publishedDate}
                    />
                    {formik.touched.publishedDate &&
                    formik.errors.publishedDate ? (
                      <div className="formik_err text-sm text-red-600">
                        {formik.errors.publishedDate}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="w-full mb-3">
                  <label htmlFor="bookImgUrl">Book Image URL</label>
                  <input
                    className="w-full p-2 mb-3 mt-1"
                    type="text"
                    placeholder="Type Book Image URL"
                    name="bookImgUrl"
                    id="bookImgUrl"
                    onChange={formik.handleChange("bookImgUrl")}
                    value={formik.values.bookImgUrl}
                  />
                </div>
                <div className="w-full mb-3">
                  <label htmlFor="desc">About Book</label>
                  <textarea
                    className="w-full p-2 mb-3 mt-1"
                    name="desc"
                    id="desc"
                    cols={30}
                    placeholder="Type About Book"
                    rows={5}
                    onChange={formik.handleChange("desc")}
                    value={formik.values.desc}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
                >
                  Add New
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
