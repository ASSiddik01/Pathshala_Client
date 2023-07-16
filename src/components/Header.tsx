import { NavLink, Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { FiHeart, FiUser } from "react-icons/fi";
import logo from "../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOutState } from "../redux/features/auth/authSlice";
import { useGetUserQuery } from "../redux/features/user/userApi";

export default function Header() {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserQuery(undefined);

  let userData: { data: { wishlist: [{}] | undefined } } | undefined =
    undefined;
  let bookLoading: boolean | undefined = undefined;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(signOutState());
  };

  if (token) {
    userData = data;
    bookLoading = isLoading;
  }

  return (
    <header className={``}>
      <div>
        <div className="header_area py-2">
          <div className="layout px-[20px]">
            <div className="flex items-center justify-between gap-[20px]">
              {/* Mobile menu */}
              <div className="catagories block md:hidden">
                <div className="catagory_menu">
                  <div className="dropdown">
                    <label
                      tabIndex={0}
                      className="btn btn-link text-white no-underline px-0 hover:no-underline "
                    >
                      <p className="block md:hidden">
                        <HiMenuAlt1
                          className="text-white duration-300 hover:text-[#38b5fe]"
                          size="20"
                        />
                      </p>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-compact top-[65px] rounded-lg dropdown-content p-2 shadow bg-base-100 w-52"
                    >
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li className="block md:hidden">
                        <Link to="/books">All Books</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Logo */}
              <div className="md:w-[20%] ">
                <div className="logo">
                  <Link to="/" className="text-white text-2xl">
                    <img
                      className="md:w-[180px] w-[150px]"
                      src={logo}
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              {/* navigator */}
              <div className="md:block hidden py-2 px-[20px]">
                <div className="layout">
                  <div className="menu_area my-1 flex justify-between md:justify-center items-center ">
                    <div className="mainmenu md:flex items-center gap-[10px]">
                      <div className="flex flex-wrap md:justify-start justify-center items-center gap-[15px]">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/books">All Books</NavLink>
                        {token && (
                          <NavLink to="/add-new-book">Add New Book </NavLink>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="action_area md:w-[20%] flex justify-between items-center md:gap-[20px] gap-[5px]">
                <Link
                  to="/add-new-book"
                  className="bg-[#38b5fe] duration-300 flex gap-1 rounded-md py-[8px] px-[12px] font-medium "
                >
                  Add <span className="hidden md:block">New</span>
                </Link>
                <div className="myaccount relative flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe]">
                  <FiUser size="20" />
                  <p className="text-[13px] hidden md:block">Account</p>
                  <div className="user_button absolute  z-50 top-[56px] w-[120px] py-[5px] px-[10px] rounded-md ">
                    <ul className="text-center">
                      {!token ? (
                        <>
                          <Link to="signin">
                            <li className="hover:border-b py-2">Sign In</li>
                          </Link>
                          <Link to="signup">
                            <li className="hover:border-b py-2">Sign Up</li>
                          </Link>
                        </>
                      ) : (
                        <Link to="" onClick={handleSignOut}>
                          <li className="hover:border-b py-2">Sign Out</li>
                        </Link>
                      )}
                    </ul>
                  </div>
                </div>
                <Link to="wishlist">
                  <div className="wishlist flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe] relative">
                    <FiHeart size="20" />
                    <p className="text-[13px] hidden md:block">Wishlist</p>
                    <div className="bg-[#38b5fe] badge badge-sm absolute text-[12px] top-[-10px] right-[-10px] md:right-0">
                      {userData?.data?.wishlist?.length ?? 0}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
