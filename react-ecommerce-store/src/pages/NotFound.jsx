import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Icon/Illustration */}
        <div className="mb-8">
          <svg 
            className="w-64 h-64 mx-auto text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-gray-800 mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Go to Home
          </Link>
          
          <Link 
            to="/cart" 
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-block"
          >
            View Cart
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-gray-600 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
              Products
            </Link>
            <Link to="/cart" className="text-blue-600 hover:text-blue-800 underline">
              Shopping Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
