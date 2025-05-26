import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function PageNotFound() {
  return (
    <div className="min-h-[80vh] bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        <FaExclamationTriangle className="text-red-500 text-6xl sm:text-7xl mb-6 mx-auto" />
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">404 - Page Not Found</h1>
        <p className="text-base sm:text-lg text-gray-400 mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
