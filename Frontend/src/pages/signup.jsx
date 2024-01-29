import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Signup() {
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
                "/api/auth/creating",
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
                navigate("/sign-in");
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
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-3 rounded-lg"
                    id="name"
                    name="name"
                    onChange={handleChange}

                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border p-3 rounded-lg"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                />
                {/* Password match validation */}
                {confirmPasswordTouched && !passwordMatch && (
                    <p style={{ color: "red" }}>Passwords are not matched!</p>
                )}

                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign Up"}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to={"/sign-in"}>
                    <span className="text-blue-700">Sign in</span>
                </Link>
            </div>
            {error && <div className="text-red-500 mt-5">{error}</div>}
        </div>
    );
}
