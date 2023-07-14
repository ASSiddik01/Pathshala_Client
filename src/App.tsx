import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { useAppDispatch } from "./redux/hooks";
import jwtDecode from "jwt-decode";
import { signInState } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  // remove expire token from local storage
  const token = localStorage.getItem("token");
  const parsedToken = token ? JSON.parse(token) : null;

  if (parsedToken) {
    const decoded = jwtDecode(parsedToken) as { exp: number };
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
    }
  }

  // set token into state for header request
  if (token) {
    dispatch(signInState({ accessToken: token }));
  }

  return <RouterProvider router={routes} />;
}

export default App;
