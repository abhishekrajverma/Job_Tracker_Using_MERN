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
                return;
            }
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                    id="email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                    id="password"
                    name="password"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign In"}
                </button>
                <OAuth /> 
            </form>
            <div className="flex gap-2 mt-5">
                <p>Not an account?</p>
                <Link to={"/sign-up"}>
                    <span className="text-blue-700">Sign Up</span>
                </Link>
            </div>
            {error && <div className="text-red-500 mt-5">{error}</div>}
        </div>
    );
}
