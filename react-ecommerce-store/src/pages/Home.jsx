import { useState, useEffect, useContext } from 'react';
import Loader from '../components/Loader/Loader';
import ProductCard from '../components/ProductCard/ProductCard';
import { SearchContext } from '../context/SearchContext';

function Home() {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get search query from context
  const { searchQuery } = useContext(SearchContext);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch products on component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Loading state
  if (loading) {
    return <Loader />;
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error!</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Success state - Display products in grid
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        {searchQuery ? 'Search Results' : 'Our Products'}
      </h1>
      
      {/* Search Info */}
      {searchQuery && (
        <p className="text-center text-gray-600 mb-6">
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      )}

      {/* No Results Message */}
      {searchQuery && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h2>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
