import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignIn() {
  let formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //   resetForm();
    },
  });

  return (
    <>
      <Head title="Sign In ||" />
      <BreadCrumb title="Sign In" />
      <div className="body_wrapper p-[20px]">
        <div className="user_form rounded-lg bg-white md:w-[400px] md:my-[50px] p-[20px] mx-auto layout">
          <h3 className="login text-center capitalize mb-[20px] text-xl font-bold">
            Login
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <input
              className="w-full p-2 mb-3"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.email}
              </div>
            ) : null}

            <input
              className="w-full p-2 mb-3"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.password}
              </div>
            ) : null}

            <Link to="/signup">
              <p className="text-sm font-bold">Create an account ?</p>
            </Link>
            <div className="flex justify-center gap-[30px] mt-[20px]">
              <button
                type="submit"
                className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
