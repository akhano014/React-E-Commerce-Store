import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

function ProductDetails() {
  // Get product ID from URL parameter
  const { id } = useParams();
  
  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product when component mounts or ID changes
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        
        // Fetch single product by ID
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]); // Re-run if ID changes

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
          <Link 
            to="/" 
            className="inline-block mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Success state - Display product details
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </Link>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-h-96 w-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4 w-fit">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="ml-2 text-gray-700">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <p className="text-4xl font-bold text-blue-600 mb-6">
              ${product.price}
            </p>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Button (non-functional for now) */}
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
