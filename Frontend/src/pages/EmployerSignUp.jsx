import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuthEmployer from "../components/OAuthEmployer.jsx";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function EmployerSignup() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });

        // Set confirmPasswordTouched to true when user starts typing in confirmPassword field
        if (e.target.id === "confirmPassword") {
            setConfirmPasswordTouched(true);
        }
    };

    useEffect(() => {
        // Check for password match only when confirmPassword is touched
        if (confirmPasswordTouched) {
            setPasswordMatch(
                formData.password === formData.confirmPassword ||
                formData.confirmPassword === ""
            );
        }
    }, [formData.password, formData.confirmPassword, confirmPasswordTouched]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/employers/create",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // Successful sign up, handle the result accordingly
            if (response.status === 201) {
                console.log("Sign up successful:", response.data);
                setError(null);
                navigate("/employer-login");
            }
        } catch (err) {
            setLoading(false);
            if (err.response) {
                setError(err.response.data.message);
                return;
            }
        }
    };

    return (
        <div>
        <div data-theme="synthwave">
            <div className=" p-3 max-w-lg mx-auto artboard phone-3 ">
                <Link to='/employer-login'><h1><MdOutlineKeyboardBackspace /></h1></Link>
                <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input
                            type="text"
                            placeholder="Name"
                            className="grow"  // added class name grow to the input field from the daisyUI library
                            id="name"
                            name="name"
                            onChange={handleChange}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input
                            type="email"
                            placeholder="Email"
                            className="grow"  // added class name grow to the input field from the daisyUI library
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
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="grow"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleChange}
                        />
                    </label>
                    {/* Password match validation */}
                    {confirmPasswordTouched && !passwordMatch && (
                        <p><div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>passwords are not matched!</span>
                        </div></p>
                    )}

                    <button
                        disabled={loading}
                        className="btn btn-info uppercase"  // added class name btn-info to the button from the daisyUI library
                    >
                        {loading ? <span className="loading loading-ball loading-xs"></span> : "Sign Up"}
                    </button>
                     <OAuthEmployer /> {/*added OAuthEmployer component to the form  */}
                </form>
                <div className="flex gap-2 mt-5">
                    <p>Have an account?</p>
                    <Link to={"/employer-login"}>
                        <span className="btn btn-xs">Sign in</span>
                    </Link>
                </div>
                {error && <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>}
            </div>
        </div>
        </div>
    );
}


