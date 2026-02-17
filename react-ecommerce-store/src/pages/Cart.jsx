import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Cart() {
  // Get cart data and functions from context
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal
  } = useContext(CartContext);

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <svg 
            className="w-24 h-24 mx-auto text-gray-400 mb-4" 
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Cart with items
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Side (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-6"
            >
              {/* Product Image */}
              <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center p-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ${item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-semibold text-gray-800 border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Item Subtotal */}
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary - Right Side (1/3 width on large screens) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-blue-600">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
              Proceed to Checkout
            </button>

            <Link 
              to="/" 
              className="block text-center text-blue-600 hover:text-blue-800 font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
