import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../Redux/user/userSlice.js'; // import sign out user actions from userSlice 
import { useNavigate } from 'react-router-dom';
import { FiPhoneCall } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { GrBlog } from "react-icons/gr";
import { GiNewspaper } from "react-icons/gi";
import { TbListSearch } from "react-icons/tb";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch(); // dispatch function from react-redux
    const navigate = useNavigate(); // navigate function from react-router-dom
    const [openProfile, setOpenProfile] = useState(false); // open profile state for profile dropdown
    const [openMenu, setOpenMenu] = useState(false); // open menu state for mobile menu
    // handle sign out
    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/sign-out');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data));
            navigate('/sign-in');
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    };
    const handleHome = () => {
        navigate('/');
    };


    return (
        <header className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">

                        <label className="btn btn-circle swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" />
                            {/* hamburger icon */}
                            <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                            {/* close icon */}
                            <svg onClick={() => setOpenMenu((prev) => !prev)} className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

                        </label>
                    </div>

                    {/* mobile menu */}
                    {openMenu && ( // if openMenu is true then show the mobile menu 
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a onClick={handleHome}><IoMdHome />Home</a></li>
                            <li>
                                <details>
                                    <summary><TbListSearch />Jobs</summary>
                                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                        <li><a>Part Time</a></li>
                                        <li><a>Full Time</a></li>
                                        <li><a>Remote</a></li>
                                        <li><a href="">Night Job</a></li>
                                    </ul>
                                </details>
                            </li>
                            <li><a href=""><GrBlog />Blog</a></li>
                            <li><a href=""><GiNewspaper />Jobs News</a>
                            </li>
                        </ul>
                    )}

                </div>
                <a className="btn btn-ghost text-xl">jobHunter</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a onClick={handleHome}><IoMdHome />Home</a></li>
                    <li>
                        <details>
                            <summary><TbListSearch />Jobs</summary>
                            <ul data-theme="synthwave" className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                <li><a>Part Time</a></li>
                                <li><a>Full Time</a></li>
                                <li><a>Remote</a></li>
                                <li><a href="">Night Job</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a href=""><GrBlog />Blog</a></li>
                    <li><a href=""><GiNewspaper />Jobs News</a></li>
                </ul>
            </div>

            <div className="navbar-end">
                <label className="swap swap-rotate">
                    {/* theme switcher */}

                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" />
                    {/* sun icon */}
                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                    {/* moon icon */}
                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                </label>
                {/* search Button */}
                <button className="btn btn-ghost btn-circle m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"><path strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        /></svg>
                </button>

                {/* profile dropdown */}
                {currentUser ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} onClick={() => setOpenProfile((prev) => !prev)} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={currentUser.user.avatar} alt="Profile" referrerPolicy='no-referrer' />
                            </div>
                        </div>
                        {openProfile && ( // if openProfile is true then show the dropdown menu 
                            <ul data-theme='acid' tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a href='/profile'><CgProfile />Profile</a>
                                </li>
                                <li><a><IoIosSettings />Settings</a></li>
                                <li><a href="/contact"><FiPhoneCall />Contacts</a></li>
                                <li><a onClick={handleSignOut}><IoMdLogOut /> Logout</a></li>
                            </ul>
                        )}

                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link to='/sign-in' className="btn btn-outline">Sign In</Link>
                        <Link to='/sign-up' className="btn btn-outline btn-success">Register</Link>
                        <Link to='/sign-in' className="btn btn-outline btn-info">Post A Jobs</Link>
                    </div>
                )}
            </div>
        </header>
    );
};
