import { Link } from 'react-router-dom';
import { FiHome, FiBook, FiEdit, FiMessageSquare, FiMoon, FiSun, FiUser } from 'react-icons/fi';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-800 dark:text-white">
              BookFinder
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiHome className="inline mr-1" /> Home
            </Link>
            <Link to="/mybooks" className="px-3 py-2 rounded-md text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiBook className="inline mr-1" /> My Books
            </Link>
            <Link to="/publish" className="px-3 py-2 rounded-md text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiEdit className="inline mr-1" /> Publish
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              Contact
            </Link>
            <Link to="/auth" className="px-3 py-2 rounded-md text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiUser className="inline mr-1" /> Login
            </Link>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;