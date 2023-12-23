import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/sign_up.css';
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate(); // Initialize useNavigate

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        if (password !== confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/users/creating', {
                name,
                email,
                password,
                confirmPassword,
            });

            if (response.status === 201) {
                console.log('User registered successfully');
                // Add additional logic or redirect the user
                navigate('/login'); // Redirect to the login page

            }
            else if (response.status === 409) {
                console.log('User already exists');
            }
            else if (response.status === 400) {
                console.log('from server: ');
            }
        } catch (error) {
            console.error('Error connecting to server:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="name">Name:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">Email:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">Password:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <button
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50"
                    type="submit"
                    disabled={!name || !email || !password || password !== confirmPassword}
                >
                    Sign Up
                </button>
                {/* Already a member? Login button/link */}
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Already a member? <a href="/login" className="text-blue-500">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
