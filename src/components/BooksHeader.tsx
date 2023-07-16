import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import { searchState } from "../redux/features/book/bookSlice";

export default function BooksHeader() {
  const dispatch = useAppDispatch();
  const { meta } = useAppSelector((state) => state.book);

  let formSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Write something"),
  });
  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },

    validationSchema: formSchema,

    onSubmit: (values) => {
      dispatch(searchState(values));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="store_header flex justify-between items-center bg-white p-2 rounded-xl box_shadow relative">
      <div className="flex items-center gap-[15px]">
        <div
          id="serach_bar"
          className={`flex items-center md:w-[950px] w-[250px]`}
        >
          <form
            className="flex justify-between gap-5  md:w-[950px] w-[250px]"
            onSubmit={(e) => handleSubmit(e)}
            onChange={formik.handleSubmit}
          >
            <input
              type="text"
              className="text-[25px] border-0 rounded-md p-1 focus:outline-none text-gray-500   md:w-[950px] w-[250px]"
              name="searchTerm"
              id="searchTerm"
              placeholder="Search book"
              onChange={formik.handleChange("searchTerm")}
              value={formik.values.searchTerm}
            />
          </form>
          {formik.touched.searchTerm && formik.errors.searchTerm ? (
            <div className="formik_err absolute bottom-0 mb-[-25px] text-sm text-red-600">
              {formik.errors.searchTerm}
            </div>
          ) : null}
        </div>
      </div>

      <div className="">
        <h4 className="store_header_text text-xs ">{meta?.total} Books</h4>
      </div>
    </div>
  );
}
