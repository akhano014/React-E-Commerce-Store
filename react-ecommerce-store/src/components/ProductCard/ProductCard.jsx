import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Handler function for card click
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
          {product.category}
        </span>

        {/* Product Title - Truncated */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 h-14 overflow-hidden">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-2xl font-bold text-blue-600">
          ${product.price}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
