# Design Document: React E-Commerce Store

## Overview

The React E-Commerce Store is a beginner-friendly single-page application (SPA) built with React, Vite, and Tailwind CSS. The application demonstrates fundamental React concepts including component composition, hooks (useState, useEffect, useContext), client-side routing, API integration, and state management using Context API.

The application follows a simple architecture with three main layers:
1. **Presentation Layer**: React components for UI rendering
2. **State Management Layer**: React Context API for global cart state
3. **Data Layer**: Fetch API for external product data and localStorage for persistence

### Key Design Principles

- **Simplicity First**: Use only React fundamentals, no advanced patterns
- **Educational Focus**: Code should be clear and easy to understand for beginners
- **Progressive Enhancement**: Build features incrementally in logical phases
- **Separation of Concerns**: Components, pages, and context are organized in separate directories

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser                              │
│  ┌───────────────────────────────────────────────────┐  │
│  │              React Application                     │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         React Router (Navigation)           │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │      CartContext (Global State)             │  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │         Pages & Components            │  │  │  │
│  │  │  │  - Home                               │  │  │  │
│  │  │  │  - ProductDetails                     │  │  │  │
│  │  │  │  - Cart                               │  │  │  │
│  │  │  │  - Navbar, ProductCard, Loader        │  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│         │                                    │           │
│         ▼                                    ▼           │
│  ┌─────────────┐                    ┌──────────────┐    │
│  │ localStorage│                    │  Fetch API   │    │
│  └─────────────┘                    └──────────────┘    │
└─────────────────────────────────────────────────────────┘
                                              │
                                              ▼
                                    ┌──────────────────┐
                                    │  FakeStore API   │
                                    │ fakestoreapi.com │
                                    └──────────────────┘
```

### Technology Stack

- **Build Tool**: Vite (fast development server and build tool)
- **UI Library**: React 18+ (component-based UI)
- **Routing**: React Router v6 (client-side routing)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **HTTP Client**: Fetch API (native browser API)
- **State Management**: React Context API (global state)
- **Persistence**: localStorage (browser storage)
- **External API**: FakeStore API (product data source)

## Components and Interfaces

### Component Hierarchy

```
App
├── CartProvider (Context)
│   ├── Navbar
│   └── Routes
│       ├── Home
│       │   └── ProductCard (multiple)
│       │       └── Loader (conditional)
│       ├── ProductDetails
│       │   └── Loader (conditional)
│       ├── Cart
│       └── NotFound
```

### Core Components

#### 1. App Component (App.jsx)

**Purpose**: Root component that sets up routing and wraps the application with CartProvider.

**Structure**:
```javascript
function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
```

**Key Responsibilities**:
- Wrap application with CartProvider for global state
- Define all application routes
- Render Navbar on all pages

#### 2. CartContext (context/CartContext.jsx)

**Purpose**: Provides global cart state and cart manipulation functions to all components.

**State Structure**:
```javascript
{
  cart: [
    {
      id: number,
      title: string,
      price: number,
      image: string,
      quantity: number
    }
  ]
}
```

**Exposed Interface**:
```javascript
{
  cart: Array,              // Current cart items
  addToCart: (product) => void,
  removeFromCart: (productId) => void,
  increaseQuantity: (productId) => void,
  decreaseQuantity: (productId) => void,
  getCartItemCount: () => number,
  getCartTotal: () => number
}
```

**Implementation Details**:
- Uses `useState` to manage cart array
- Uses `useEffect` to sync cart with localStorage on every change
- Loads initial cart state from localStorage on mount
- All cart operations create new array references (immutable updates)

**Cart Operations**:

1. **addToCart(product)**:
   - Check if product already exists in cart (by id)
   - If exists: increase quantity by 1
   - If not exists: add product with quantity = 1

2. **removeFromCart(productId)**:
   - Filter out the product with matching id

3. **increaseQuantity(productId)**:
   - Map through cart, increment quantity for matching id

4. **decreaseQuantity(productId)**:
   - Map through cart, decrement quantity for matching id
   - If quantity becomes 0, remove the item

5. **getCartItemCount()**:
   - Reduce cart array to sum of all quantities

6. **getCartTotal()**:
   - Reduce cart array to sum of (price * quantity) for each item

#### 3. Navbar Component (components/Navbar/Navbar.jsx)

**Purpose**: Provides navigation links and displays cart item count.

**Structure**:
```javascript
function Navbar() {
  const { getCartItemCount } = useContext(CartContext);
  const cartCount = getCartItemCount();
  
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">
        Cart
        {cartCount > 0 && <span className="badge">{cartCount}</span>}
      </Link>
    </nav>
  );
}
```

**Key Features**:
- Uses `useContext` to access cart count
- Displays badge only when cart has items
- Responsive design with mobile menu
- Sticky positioning at top of page

#### 4. Home Page (pages/Home.jsx)

**Purpose**: Fetches and displays all products in a grid layout.

**State Management**:
```javascript
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

**Data Fetching Flow**:
```javascript
useEffect(() => {
  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
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
```

**Rendering Logic**:
- If loading: show Loader component
- If error: show error message with retry option
- If success: render ProductCard for each product in grid

**Grid Layout**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns
- Uses Tailwind CSS grid utilities

#### 5. ProductCard Component (components/ProductCard/ProductCard.jsx)

**Purpose**: Displays a single product in the grid with image, title, price, and category.

**Props Interface**:
```javascript
{
  product: {
    id: number,
    title: string,
    price: number,
    image: string,
    category: string
  }
}
```

**Structure**:
```javascript
function ProductCard({ product }) {
  const navigate = useNavigate();
  
  return (
    <div onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <span>{product.category}</span>
    </div>
  );
}
```

**Key Features**:
- Clickable card navigates to product details
- Truncates long titles with CSS
- Fixed aspect ratio for images
- Hover effects for interactivity

#### 6. ProductDetails Page (pages/ProductDetails.jsx)

**Purpose**: Displays detailed information for a single product and allows adding to cart.

**State Management**:
```javascript
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const { id } = useParams();
const { addToCart } = useContext(CartContext);
```

**Data Fetching Flow**:
```javascript
useEffect(() => {
  async function fetchProduct() {
    try {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) throw new Error('Product not found');
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
}, [id]);
```

**Layout**:
- Two-column layout on desktop (image | details)
- Single column on mobile (image above details)
- Displays: image, title, description, price, category, rating
- "Add to Cart" button with click handler
- "Back to Home" link

**Add to Cart Handler**:
```javascript
function handleAddToCart() {
  addToCart(product);
  // Optional: show success message or navigate to cart
}
```

#### 7. Cart Page (pages/Cart.jsx)

**Purpose**: Displays all cart items with quantity controls and total price.

**State Access**:
```javascript
const {
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartTotal
} = useContext(CartContext);
```

**Rendering Logic**:
- If cart is empty: show empty cart message with link to home
- If cart has items: render list of cart items with controls

**Cart Item Display**:
```javascript
{cart.map(item => (
  <div key={item.id}>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>${item.price}</p>
    </div>
    <div>
      <button onClick={() => decreaseQuantity(item.id)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => increaseQuantity(item.id)}>+</button>
    </div>
    <p>${(item.price * item.quantity).toFixed(2)}</p>
    <button onClick={() => removeFromCart(item.id)}>Remove</button>
  </div>
))}
```

**Total Display**:
```javascript
<div>
  <h2>Total: ${getCartTotal().toFixed(2)}</h2>
</div>
```

#### 8. Loader Component (components/Loader/Loader.jsx)

**Purpose**: Reusable loading indicator for async operations.

**Structure**:
```javascript
function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}
```

**Usage**: Displayed while fetching products or product details.

#### 9. NotFound Page (pages/NotFound.jsx)

**Purpose**: 404 error page for invalid routes.

**Structure**:
```javascript
function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}
```

## Data Models

### Product Model

Represents a product from the FakeStore API.

```javascript
{
  id: number,              // Unique product identifier
  title: string,           // Product name
  price: number,           // Product price in USD
  description: string,     // Full product description
  category: string,        // Product category
  image: string,           // URL to product image
  rating: {
    rate: number,          // Average rating (0-5)
    count: number          // Number of ratings
  }
}
```

**Example**:
```javascript
{
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack",
  price: 109.95,
  description: "Your perfect pack for everyday use...",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120
  }
}
```

### Cart Item Model

Represents a product in the shopping cart with quantity.

```javascript
{
  id: number,              // Product ID (from Product model)
  title: string,           // Product name
  price: number,           // Product price
  image: string,           // Product image URL
  quantity: number         // Number of items in cart
}
```

**Example**:
```javascript
{
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack",
  price: 109.95,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  quantity: 2
}
```

**Note**: Cart items store only essential product information to minimize localStorage size.

### localStorage Schema

Cart data is stored in localStorage under the key `"ecommerce-cart"`.

**Storage Format**:
```javascript
localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
```

**Retrieval Format**:
```javascript
const savedCart = JSON.parse(localStorage.getItem('ecommerce-cart')) || [];
```

## API Integration

### FakeStore API Endpoints

**Base URL**: `https://fakestoreapi.com`

#### 1. Get All Products

**Endpoint**: `GET /products`

**Response**: Array of Product objects

**Usage**: Home page to display product grid

**Error Handling**:
- Network error: Display "Failed to load products. Please check your connection."
- Server error (500): Display "Server error. Please try again later."

#### 2. Get Single Product

**Endpoint**: `GET /products/:id`

**Response**: Single Product object

**Usage**: Product details page

**Error Handling**:
- 404: Display "Product not found"
- Network error: Display "Failed to load product. Please check your connection."

### Fetch Implementation Pattern

All API calls follow this pattern:

```javascript
async function fetchData(url) {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (err) {
    setError(err.message);
    return null;
  } finally {
    setLoading(false);
  }
}
```

## localStorage Integration

### Save Cart to localStorage

**Trigger**: Every time cart state changes

**Implementation**:
```javascript
useEffect(() => {
  localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
}, [cart]);
```

### Load Cart from localStorage

**Trigger**: When CartContext mounts (app initialization)

**Implementation**:
```javascript
const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('ecommerce-cart');
  return savedCart ? JSON.parse(savedCart) : [];
});
```

**Error Handling**:
- If JSON.parse fails (corrupted data): Initialize empty cart
- If localStorage is unavailable: Cart works in memory only



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Loading State During Async Operations

*For any* API request (products list or single product), while the request is in progress, the application should display a loading indicator.

**Validates: Requirements 2.2, 3.2, 8.1**

### Property 2: Error Handling for Failed Requests

*For any* API request that fails (network error, server error, or invalid response), the application should display a user-friendly error message and not crash.

**Validates: Requirements 2.6, 3.7, 8.2, 8.5**

### Property 3: Product List Rendering

*For any* array of products returned from the API, all products should be rendered in the grid, and each rendered product should contain its image, title, price, and category.

**Validates: Requirements 2.3, 2.4**

### Property 4: Product Details Rendering

*For any* product fetched by ID, the rendered product details page should contain all product fields: image, title, description, price, category, and rating.

**Validates: Requirements 3.3**

### Property 5: Navigation on Product Click

*For any* product card clicked, the application should navigate to the correct product details route (/product/:id) with the matching product ID.

**Validates: Requirements 2.5, 6.4**

### Property 6: Add to Cart Creates Cart Item

*For any* product not currently in the cart, adding it to the cart should result in the cart containing that product with quantity 1.

**Validates: Requirements 4.1**

### Property 7: Add to Cart Increases Quantity

*For any* product already in the cart, adding it again should increase its quantity by 1 without creating a duplicate entry.

**Validates: Requirements 4.2**

### Property 8: Increase Quantity Operation

*For any* cart item, clicking the increase quantity button should increment that item's quantity by exactly 1.

**Validates: Requirements 4.4**

### Property 9: Decrease Quantity Operation

*For any* cart item with quantity greater than 1, clicking the decrease quantity button should decrement that item's quantity by exactly 1.

**Validates: Requirements 4.5**

### Property 10: Remove from Cart Operation

*For any* cart item, clicking the remove button should result in that item no longer being in the cart.

**Validates: Requirements 4.7**

### Property 11: Cart Items Display Required Fields

*For any* items in the cart, the rendered cart page should display each item's image, title, price, and quantity.

**Validates: Requirements 4.3**

### Property 12: Cart Total Calculation

*For any* cart state, the displayed total should equal the sum of (price × quantity) for all items in the cart.

**Validates: Requirements 4.8**

### Property 13: Cart Persistence Round Trip

*For any* cart state, saving to localStorage and then loading from localStorage should restore the exact same cart contents (same items with same quantities).

**Validates: Requirements 5.1, 5.3**

### Property 14: Cart Count Badge Display

*For any* cart state, the navbar badge should display the total number of items (sum of all quantities) in the cart.

**Validates: Requirements 6.3**

### Property 15: Product Details API Call

*For any* valid product ID in the route parameter, navigating to /product/:id should trigger a fetch request to the correct API endpoint (https://fakestoreapi.com/products/:id).

**Validates: Requirements 3.1**

## Error Handling

### Error Categories

The application handles three main categories of errors:

#### 1. Network Errors

**Scenarios**:
- No internet connection
- API server is down
- Request timeout

**Handling Strategy**:
- Display user-friendly message: "Unable to connect. Please check your internet connection."
- Provide retry button to attempt request again
- Maintain previous state (don't clear existing data)

**Implementation**:
```javascript
catch (error) {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    setError('Unable to connect. Please check your internet connection.');
  } else {
    setError('Something went wrong. Please try again.');
  }
}
```

#### 2. HTTP Errors

**Scenarios**:
- 404 Not Found (invalid product ID)
- 500 Server Error
- Other HTTP error codes

**Handling Strategy**:
- Check response.ok before parsing JSON
- Display specific error messages based on status code
- For 404 on product details: show "Product not found" with link to home

**Implementation**:
```javascript
if (!response.ok) {
  if (response.status === 404) {
    throw new Error('Product not found');
  } else if (response.status >= 500) {
    throw new Error('Server error. Please try again later.');
  } else {
    throw new Error(`Error: ${response.status}`);
  }
}
```

#### 3. Data Errors

**Scenarios**:
- Corrupted localStorage data
- Invalid JSON in localStorage
- Missing required fields in API response

**Handling Strategy**:
- Wrap JSON.parse in try-catch
- Validate data structure before using
- Fall back to safe defaults (empty cart, empty array)

**Implementation**:
```javascript
try {
  const savedCart = JSON.parse(localStorage.getItem('ecommerce-cart'));
  if (Array.isArray(savedCart)) {
    return savedCart;
  }
} catch (error) {
  console.error('Failed to parse cart data:', error);
}
return []; // Safe default
```

### Error State Management

Each page with async operations maintains error state:

```javascript
const [error, setError] = useState(null);
```

**Error Display Pattern**:
```javascript
{error && (
  <div className="error-message">
    <p>{error}</p>
    <button onClick={retryFunction}>Try Again</button>
  </div>
)}
```

### Edge Cases

#### Empty States

1. **No Products**: If API returns empty array, show "No products available"
2. **Empty Cart**: If cart is empty, show "Your cart is empty" with link to shop
3. **No Search Results**: Not applicable (no search feature)

#### Boundary Conditions

1. **Quantity = 0**: Automatically remove item from cart
2. **Very Long Product Titles**: Truncate with CSS ellipsis
3. **Large Cart**: No limit, but may impact localStorage (5-10MB limit)
4. **Negative Prices**: Trust API data (no validation needed for learning project)

#### Browser Compatibility

1. **localStorage Unavailable**: Cart works in memory only (session-based)
2. **Fetch API Not Supported**: Assume modern browser (no polyfill needed)
3. **JavaScript Disabled**: Application won't work (SPA requirement)

## Testing Strategy

### Dual Testing Approach

The application will use both unit tests and property-based tests for comprehensive coverage:

- **Unit Tests**: Verify specific examples, edge cases, and integration points
- **Property Tests**: Verify universal properties across randomized inputs

Both testing approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across many inputs.

### Testing Framework Setup

**Framework**: Vitest (fast, Vite-native testing framework)

**Additional Libraries**:
- `@testing-library/react` - React component testing utilities
- `@testing-library/user-event` - User interaction simulation
- `@testing-library/jest-dom` - Custom matchers for DOM assertions
- `fast-check` - Property-based testing library for JavaScript

**Configuration**:
```javascript
// vitest.config.js
export default {
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
};
```

### Property-Based Testing Configuration

- **Minimum iterations per property test**: 100 runs
- **Tagging format**: Each property test must include a comment:
  ```javascript
  // Feature: react-ecommerce-store, Property 1: Loading State During Async Operations
  ```
- **Generator Strategy**: Use fast-check to generate random products, cart states, and user interactions

### Unit Testing Strategy

Unit tests should focus on:

1. **Specific Examples**:
   - Adding a specific product to cart
   - Removing a specific item
   - Calculating total for a known cart state

2. **Edge Cases**:
   - Empty cart operations
   - Quantity reaching zero
   - Corrupted localStorage data
   - Empty product list from API

3. **Integration Points**:
   - CartContext provider wrapping components
   - Router navigation between pages
   - localStorage read/write operations

4. **Error Conditions**:
   - Failed API requests
   - Invalid product IDs
   - Network errors

**Balance**: Avoid writing too many unit tests for scenarios covered by property tests. Focus unit tests on concrete examples and integration scenarios.

### Property Testing Strategy

Each correctness property from the design document must be implemented as a property-based test:

1. **Property 1 - Loading State**: Generate random API delays, verify loading indicator shows during fetch
2. **Property 2 - Error Handling**: Generate random error types, verify error messages display
3. **Property 3 - Product List Rendering**: Generate random product arrays, verify all render correctly
4. **Property 4 - Product Details Rendering**: Generate random products, verify all fields render
5. **Property 5 - Navigation**: Generate random product IDs, verify correct navigation
6. **Property 6 - Add to Cart**: Generate random products, verify cart contains them
7. **Property 7 - Quantity Increase on Duplicate**: Generate random products, add twice, verify quantity = 2
8. **Property 8 - Increase Quantity**: Generate random cart states, verify increment works
9. **Property 9 - Decrease Quantity**: Generate random cart states, verify decrement works
10. **Property 10 - Remove from Cart**: Generate random cart states, verify removal works
11. **Property 11 - Cart Display**: Generate random cart states, verify all fields render
12. **Property 12 - Total Calculation**: Generate random cart states, verify total = sum(price × quantity)
13. **Property 13 - localStorage Round Trip**: Generate random cart states, verify save/load preserves data
14. **Property 14 - Cart Count Badge**: Generate random cart states, verify badge shows correct count
15. **Property 15 - API Call**: Generate random product IDs, verify correct endpoint called

### Test Organization

```
src/
  __tests__/
    unit/
      CartContext.test.jsx
      Home.test.jsx
      ProductDetails.test.jsx
      Cart.test.jsx
      Navbar.test.jsx
    properties/
      cart-operations.property.test.jsx
      product-display.property.test.jsx
      navigation.property.test.jsx
      persistence.property.test.jsx
```

### Example Property Test Structure

```javascript
import fc from 'fast-check';
import { describe, it, expect } from 'vitest';

// Feature: react-ecommerce-store, Property 12: Cart Total Calculation
describe('Property: Cart Total Calculation', () => {
  it('should calculate total as sum of price * quantity for all items', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          id: fc.integer({ min: 1, max: 1000 }),
          price: fc.float({ min: 0.01, max: 1000, noNaN: true }),
          quantity: fc.integer({ min: 1, max: 10 }),
        })),
        (cartItems) => {
          const expectedTotal = cartItems.reduce(
            (sum, item) => sum + (item.price * item.quantity),
            0
          );
          const calculatedTotal = getCartTotal(cartItems);
          expect(calculatedTotal).toBeCloseTo(expectedTotal, 2);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Manual Testing Checklist

Since this is a learning project, manual testing is also important:

1. **Visual Testing**:
   - Responsive design on mobile, tablet, desktop
   - Loading spinners appear and disappear correctly
   - Error messages are readable and helpful
   - Images load and display properly

2. **User Flow Testing**:
   - Browse products → View details → Add to cart → View cart → Adjust quantities
   - Navigate between pages using navbar
   - Refresh page and verify cart persists
   - Test with slow network (throttle in DevTools)

3. **Browser Testing**:
   - Test in Chrome, Firefox, Safari
   - Test with localStorage disabled
   - Test with JavaScript console for errors

### Coverage Goals

- **Unit Test Coverage**: 70%+ of component logic
- **Property Test Coverage**: 100% of correctness properties
- **Integration Coverage**: All major user flows tested

### Continuous Testing

- Run tests on every code change during development
- Use Vitest watch mode for instant feedback
- Run full test suite before committing code
