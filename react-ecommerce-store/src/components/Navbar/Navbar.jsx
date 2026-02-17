import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';

function Navbar() {
  const navigate = useNavigate();
  
  // Get cart item count from context
  const { getCartItemCount } = useContext(CartContext);
  const cartCount = getCartItemCount();

  // Get auth info from context
  const { currentUser, logout } = useContext(AuthContext);

  // Get search context
  const { searchQuery, updateSearch, clearSearch } = useContext(SearchContext);

  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  
  // State for user dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  // Handle search
  const handleSearch = (e) => {
    updateSearch(e.target.value);
    // Navigate to home if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    clearSearch();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 flex-shrink-0">
            ShopHub
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {!searchQuery && (
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Home
            </Link>
            
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center"
            >
              <svg 
                className="w-6 h-6 mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Section */}
            {currentUser ? (
              // Logged in - Show user dropdown
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{currentUser.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-600">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in - Show login button
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Mobile Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile User Section */}
            {currentUser ? (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="py-2 text-gray-600 text-sm">
                  Signed in as <span className="font-semibold">{currentUser.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-800 font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
