function Loader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Logo/Brand Name */}
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-blue-600 mb-2">ShopHub</h1>
        <p className="text-gray-600 text-center">Your Shopping Destination</p>
      </div>
      
      {/* Animated Spinner */}
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-6 text-gray-600 animate-pulse">Loading products...</p>
    </div>
  );
}

export default Loader;
