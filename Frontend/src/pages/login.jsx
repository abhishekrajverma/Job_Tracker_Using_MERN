import Header from "../components/header.jsx";
import axios from "axios";
import React, { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx'
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from '../Redux/user/userSlice.js'


export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user) // get loading and error from redux store 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateError, setUpdateError] = useState(false); // update success state 


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior 
        e.preventDefault();
        try {
            dispatch(signInStart())
            const response = await axios.post(
                "/api/auth/sign-in",
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // Successful sign up, handle the result accordingly
            if (response.status === 200) {
                dispatch(signInSuccess(response.data))
                navigate("/");
            }
        } catch (err) {
            if (err.response) {
                dispatch(signInFailure(err.response.data.message))
                setUpdateError(true); // set update error to true when error occurs from the server
                return;
            }
        }
    };
    // handle logo click 
    const handleLogoClick = () => {
        setUpdateError(false); // set update error to false
    }

    return (
        <div>
            <Header />
        <div data-theme="synthwave">
            <div className="p-3 max-w-lg mx-auto artboard phone-3">
                <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input
                            type="email"
                            placeholder="Email"
                            className="grow"
                            id="email"
                            name="email"
                            onChange={handleChange}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input
                            type="password"
                            placeholder="Password"
                            className="grow"
                            id="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </label>
                    <button
                        disabled={loading}
                        className="btn btn-info uppercase"
                    >
                        {loading ? <span className="loading loading-spinner loading-md"></span> : "Sign In"}
                    </button>
                    <OAuth />
                </form>
                <div className="flex gap-2 mt-5">
                    <p>Not an account?</p>
                    <Link to={"/sign-up"}>
                        <span className="btn btn-xs">Sign Up</span>
                    </Link>
                </div>
                {error && updateError && <div role="alert" className="alert alert-error">
                    <svg onClick={handleLogoClick} xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>}
            </div>
        </div>
        </div>
    );
}
