import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { token } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  if (!token) {
    return <Navigate to={"/signin"} state={{ path: pathname }}></Navigate>;
  }

  return children;
}
