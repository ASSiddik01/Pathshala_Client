import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { FiHeart, FiSearch, FiUser } from "react-icons/fi";
import logo from "../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOutState } from "../redux/features/auth/authSlice";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(signOutState());
  };

  return (
    <header className={``}>
      {/* Search bar */}
      <div
        id="serach_bar"
        className={`serach_bar ${
          openSearch && "active"
        } md:px-[70px] px-[20px] h-[83px] flex justify-between items-center absolute bg-[#131921] z-[999] left-0 top-0 w-full`}
      >
        <form className="flex flex-row-reverse" action="">
          <input
            type="text"
            className="text-[25px] border-0 rounded-md p-1 focus:outline-none text-gray-500 md:w-[1060px] w-[260px]"
            name="search"
            id="serach"
            placeholder="Search our store"
          />
          <button type="submit" className="md:mr-[50px] mr-[30px]">
            <FiSearch size="20" color="#fff" />
          </button>
        </form>
        <RxCross1
          size="20"
          onClick={() => setOpenSearch(!openSearch)}
          color="#fff"
        />
      </div>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="action_area md:w-[15%] flex justify-between md:gap-[20px] gap-[5px]">
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
                <div
                  onClick={() => setOpenSearch(!openSearch)}
                  className="serach flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe]"
                >
                  <FiSearch size="20" />
                  <p className="text-[13px] hidden md:block">Search</p>
                </div>
                <div className="wishlist flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe] relative">
                  <FiHeart size="20" />
                  <p className="text-[13px] hidden md:block">Wishlist</p>
                  <div className="bg-[#38b5fe] badge badge-sm absolute text-[12px] top-[-10px] right-[-10px] md:right-0">
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
