import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    
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
                    <input type="text" placeholder="Search" className='bg-transparent focus:outline-none' />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                <ul className="flex gap-4">
                    {currentUser ? (
                        <Link to='/profile'>
                            <img className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.user.avatar} alt="Profile" referrerPolicy='no-referrer' />
                        </Link>
                    ) : (
                        <Link to='/sign-in'>
                            <li className='hidden sm:inline bg-gray-800
                            hover:opacity-95 p-10px text-white cursor-pointer 
                            p-2 font-semibold rounded-lg'>Login</li>
                        </Link>
                    )}
                </ul>
            </nav>
        </header>
    );
};
