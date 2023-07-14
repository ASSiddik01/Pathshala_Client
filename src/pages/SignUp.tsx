import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { IError } from "../types/globalTypes";

export default function SignUp() {
  const [signUp, { isSuccess, data, isError, error, isLoading, reset }] =
    useSignUpMutation();
  const navigate = useNavigate();

  // form handle
  let formSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null!], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      const { firstname, lastname, email, password } = values;
      const data = { firstname, lastname, email, password };
      signUp(data);
      resetForm();
    },
  });

  // notification
  useEffect(() => {
    if (isSuccess) {
      toast(`${data?.message}`);
      reset();
      navigate("/signin");
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
      <Head title="Sign Up ||" />
      <BreadCrumb title="Sign Up" />
      <div className="body_wrapper p-[20px]">
        <div className="rounded-lg bg-white md:w-[400px] md:my-[50px] p-[20px] mx-auto layout">
          <h3 className="login text-center capitalize mb-[20px] text-xl font-bold">
            create new account
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <input
              className="w-full p-2 mb-3"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              onChange={formik.handleChange("firstname")}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.firstname}
              </div>
            ) : null}
            <input
              className="w-full p-2 mb-3"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              onChange={formik.handleChange("lastname")}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.lastname}
              </div>
            ) : null}
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
            <input
              className="w-full p-2 mb-3"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={formik.handleChange("confirmPassword")}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <Link to="/signin">
              <p className="text-sm font-bold">Already have an account?</p>
            </Link>
            <div className="flex justify-center gap-[30px] mt-[20px]">
              <button
                type="submit"
                className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
