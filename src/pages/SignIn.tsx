import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignInMutation } from "../redux/features/auth/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IError } from "../types/globalTypes";
import Loading from "../components/Loading";
import { useAppDispatch } from "../redux/hooks";
import { signInState } from "../redux/features/auth/authSlice";

export default function SignIn() {
  const [signIn, { isSuccess, data, isError, error, isLoading, reset }] =
    useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const path = state?.path || "/";

  // form handle
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
      signIn(values);
      resetForm();
    },
  });

  // token set in local storage
  const accessToken = data?.data?.accessToken;
  if (accessToken) {
    localStorage.setItem("token", JSON.stringify(accessToken));
  }

  // notification
  useEffect(() => {
    if (isSuccess) {
      toast(`${data?.message}`);
      reset();
      // set token into state for header request
      if (accessToken) {
        dispatch(signInState({ accessToken }));
      }
      navigate(path, { replace: true });
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
