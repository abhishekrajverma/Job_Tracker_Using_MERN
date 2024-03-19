import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../Redux/user/userSlice.js"; // import sign out user actions from userSlice
import { useNavigate, } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiPhoneCall } from "react-icons/fi";
import { BiSolidShow } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";

export default function Header() {
  const id = '65f9ee29cfb7fb56208029bf';
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // dispatch function from react-redux
  const navigate = useNavigate(); // navigate function from react-router-dom
  const [openProfile, setOpenProfile] = useState(false); // open profile state for profile dropdown
  const [openMenu, setOpenMenu] = useState(false); // open menu state for mobile menu
  // handle sign out
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/sign-out");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  const handleHome = () => {
    navigate("/");
  };

  // handle show listings
  const handleShowListings = () => {
    navigate("/job/available");
  };

  // handle show application
  const handleShowApplication = () => {
    navigate(`/my-application/${id}`);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              onClick={() => setOpenMenu((prev) => !prev)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/*  if the user tap again on the menu button close the menu */}
          {openMenu && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <details open>
                  <summary>Parent</summary>
                  <ul>
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                    <li>
                      <details open>
                        <summary>Parent</summary>
                        <ul>
                          <li>
                            <a>Submenu 1</a>
                          </li>
                          <li>
                            <a>Submenu 2</a>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl">jobHunter</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className="uppercase btn btn-active  m-2" onClick={handleHome}>Home</a>
          </li>
          <li>
            <a className="uppercase btn btn-active m-2" onClick={handleShowListings}>Available Jobs</a>
          </li>
          <li>
            <a className="uppercase btn btn-active m-2">Contact</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {/* search icon */}
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        {/* theme changer  */}
        <label className="flex cursor-pointer gap-2 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="night"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              onClick={() => setOpenProfile((prev) => !prev)} // if the user tap on the avatar then open the profile dropdown menu and close the menu if it is open on mobile view 
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {currentUser &&
              currentUser.employer &&
              currentUser.employer.avatar ? (
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={currentUser.employer.avatar}
                  />
                </div>
              ) : (
                <div className="w-10 rounded-full">
                  <img
                    alt="user"
                    src={currentUser.user.avatar}
                  />
                </div>
              )}
            </div>
            {openProfile && ( // if openProfile is true then show the dropdown menu
              <ul
                data-theme="acid"
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/profile">
                    <CgProfile />
                    Profile
                  </a>
                </li>
                <li>
                  <a onClick={handleShowApplication}>
                    <BiSolidShow />
                    Show Applications
                  </a>
                </li>
                <li>
                  <a href="/contact">
                    <FiPhoneCall />
                    Contacts
                  </a>
                </li>
                <li>
                  <a onClick={handleSignOut}>
                    <IoMdLogOut /> Logout
                  </a>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              onClick={() => setOpenMenu((prev) => !prev)}
              tabIndex={0}
              role="button"
              className=" btn-sm btn-success btn btn-outline"
            >
              Login
            </div>
            {openMenu && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={"/sign-in"}>JobSeeker</Link>
                </li>
                <li>
                  <Link to={"/employer-login"}>Employer</Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
