import { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';

function Home() {
  // State management - the component's memory
  const [products, setProducts] = useState([]);      // Stores fetched products
  const [loading, setLoading] = useState(true);      // Tracks loading state
  const [error, setError] = useState(null);          // Stores error message if any

  // useEffect runs after component mounts (appears on screen)
  useEffect(() => {
    // Define async function to fetch products
    async function fetchProducts() {
      try {
        // Step 1: Set loading to true (show spinner)
        setLoading(true);
        
        // Step 2: Fetch data from API
        const response = await fetch('https://fakestoreapi.com/products');
        
        // Step 3: Check if request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        // Step 4: Parse JSON data
        const data = await response.json();
        
        // Step 5: Update state with products
        setProducts(data);
        setError(null); // Clear any previous errors
        
      } catch (err) {
        // If anything goes wrong, store the error message
        setError(err.message);
      } finally {
        // Always set loading to false when done (success or error)
        setLoading(false);
      }
    }

    // Call the function
    fetchProducts();
  }, []); // Empty dependency array = run only once on mount

  // Conditional rendering based on state
  
  // If loading, show spinner
  if (loading) {
    return <Loader />;
  }

  // If error, show error message
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

  // If successful, show products (for now, just a list)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
