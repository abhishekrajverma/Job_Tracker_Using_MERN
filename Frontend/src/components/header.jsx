import { FaSearch } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md'>
            <nav className="flex items-center justify-between max-w-6xl mx-auto p-3">
                <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Abhishek</span>
                    <span className='text-slate-700'>Raj</span>
                </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                <ul className="flex gap-4">
                    <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'> Home</li>
                    </Link>
                    <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'> About</li>
                    </Link>
                    <Link to='/Sign-in'>
                    <li className='sm:inline text-slate-700 hover:underline'>Sign in</li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
