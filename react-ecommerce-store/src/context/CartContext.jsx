import { createContext, useState } from 'react';

// Create Context
export const CartContext = createContext();

// Provider Component
export function CartProvider({ children }) {
  // State: cart is an array of items
  // Each item: { id, title, price, image, quantity }
  const [cart, setCart] = useState([]);

  // Function 1: Add product to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Product exists: increase quantity by 1
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Product doesn't exist: add it with quantity 1
        return [...prevCart, {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      }
    });
  };

  // Function 2: Remove product from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Function 3: Increase quantity
  const increaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Function 4: Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity - 1;
          // If quantity becomes 0, we'll filter it out below
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with quantity 0
    });
  };

  // Function 5: Get total number of items in cart
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Function 6: Get total price of all items
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Value object: everything we want to share
  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartItemCount,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
