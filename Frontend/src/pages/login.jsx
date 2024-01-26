import React, { useState } from 'react';
import '../assets/css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate(); // Initialize useNavigate

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/users/sign-in', {
                email,
                password,
            });
            console.log(response.data);
            if (response.status === 200) {
                // Successful login, handle the result accordingly
                console.log('Login successful:');
                alert('Login successful')
                navigate('/'); // Redirect to the home page on successful login
            } else if (response.status === 401){
                // Incorrect username or password, handle the result accordingly
                console.log('Incorrect username or password. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    const handleSubmit = (e) => {
        console.log('Email:', email);
        console.log('Password:', password);
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        // Call your backend authentication function
        handleLogin();
    };

    return (
        <div>
            <div className="wrapper bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-md shadow-md w-96">
                    <div className="text-2xl font-semibold mb-6">Login Form</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                type="email"
                                required
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                type="password"
                                required
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="flex items-center mb-4">
                            <input
                                className="mr-2"
                                type="checkbox"
                                id="remember-me"
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <div className="mb-4">
                            <a className="text-blue-500" href="#">Forgot password?</a>
                        </div>
                        <div className="mb-4">
                            <button
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer disabled:opacity-50"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                        <div className="text-gray-600">
                            Not a member? <a className="text-blue-500" href="/sign-up">Sign up now</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;