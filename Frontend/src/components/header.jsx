import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using it for navigation.
import '../assets/css/header.css';

const Header = ({ isAuthenticated }) => {
    return (
        // You can use the following JSX in your React component
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex items-center justify-between">
                <div className="text-2xl font-bold">Your Logo</div>
                <ul className="flex space-x-4">
                    <li><a className="hover:underline" href="/">Home</a></li>
                    <li><a className="hover:underline" href="/users/example">About</a></li>
                    <li><a className="hover:underline" href="#">Services</a></li>
                    {isAuthenticated ? (
                        <li><a className="hover:underline" href="/users/sign-out">Sign Out</a></li>
                    ) : (
                        <li><Link className="hover:underline" to="/signup">Sign Up</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
