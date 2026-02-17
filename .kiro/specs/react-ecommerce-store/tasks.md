# Implementation Plan: React E-Commerce Store

## Overview

This implementation plan breaks down the React E-Commerce Store into incremental, beginner-friendly tasks. Each task builds on previous work and includes clear objectives with specific requirements references. The plan follows a learning-focused approach, introducing React concepts progressively from basic components to state management to persistence.

## Tasks

- [x] 1. Project Setup and Configuration
  - Create new Vite project with React template using `npm create vite@latest`
  - Install dependencies: `react-router-dom` for routing and `tailwindcss` for styling
  - Configure Tailwind CSS (tailwind.config.js, postcss.config.js, and import in index.css)
  - Create folder structure: `src/components/`, `src/pages/`, `src/context/`
  - Set up basic App.jsx with placeholder content to verify setup works
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Create Basic Routing Structure
  - Install and configure React Router in App.jsx
  - Create placeholder page components: Home.jsx, ProductDetails.jsx, Cart.jsx, NotFound.jsx in `src/pages/`
  - Set up routes: "/" for Home, "/product/:id" for ProductDetails, "/cart" for Cart, "*" for NotFound
  - Add basic content to each page to verify routing works
  - Test navigation by manually changing URLs
  - _Requirements: 6.5_

- [x] 3. Build Loader Component
  - Create `src/components/Loader/Loader.jsx` with a spinning animation
  - Use Tailwind CSS classes for centering and animation (animate-spin)
  - Export component for reuse across pages
  - _Requirements: 2.2, 3.2_

- [x] 4. Implement Home Page with Product Fetching
  - [x] 4.1 Create Home page component with state management
    - Add state for products array, loading boolean, and error string using useState
    - Create useEffect hook to fetch products from https://fakestoreapi.com/products on mount
    - Implement try-catch error handling in fetch logic
    - Set loading to true before fetch, false after completion
    - _Requirements: 2.1, 2.2, 2.6_
  
  - [ ]* 4.2 Write property test for loading state during fetch
    - **Property 1: Loading State During Async Operations**
    - **Validates: Requirements 2.2, 3.2, 8.1**
  
  - [ ]* 4.3 Write property test for error handling
    - **Property 2: Error Handling for Failed Requests**
    - **Validates: Requirements 2.6, 3.7, 8.2, 8.5**

- [x] 5. Create ProductCard Component
  - Create `src/components/ProductCard/ProductCard.jsx` that accepts a product prop
  - Display product image, title, price, and category using Tailwind CSS for styling
  - Use fixed aspect ratio for images and truncate long titles with CSS
  - Add hover effects for interactivity (scale, shadow)
  - Make entire card clickable using onClick handler
  - Use useNavigate hook to navigate to `/product/${product.id}` on click
  - _Requirements: 2.4, 2.5_

- [x] 6. Display Products in Grid Layout on Home Page
  - Import ProductCard component into Home.jsx
  - Conditionally render: Loader when loading, error message when error exists, or product grid when data loaded
  - Map through products array and render ProductCard for each product
  - Use Tailwind CSS grid with responsive columns (1 on mobile, 2 on tablet, 3-4 on desktop)
  - Add padding and gap between cards
  - _Requirements: 2.3, 2.4_

- [ ]* 7. Write property tests for product display
  - [ ]* 7.1 Write property test for product list rendering
    - **Property 3: Product List Rendering**
    - **Validates: Requirements 2.3, 2.4**
  
  - [ ]* 7.2 Write property test for navigation on product click
    - **Property 5: Navigation on Product Click**
    - **Validates: Requirements 2.5, 6.4**

- [x] 8. Checkpoint - Verify Home Page Works
  - Run the development server and verify products load and display correctly
  - Test clicking on product cards (should navigate even though details page is empty)
  - Test error handling by temporarily breaking the API URL
  - Ensure all tests pass, ask the user if questions arise

- [x] 9. Implement Product Details Page
  - [x] 9.1 Create ProductDetails page with dynamic routing
    - Use useParams hook to get product ID from URL
    - Add state for product object, loading boolean, and error string
    - Create useEffect that fetches single product from https://fakestoreapi.com/products/:id
    - Implement error handling and loading states (same pattern as Home page)
    - _Requirements: 3.1, 3.2, 3.7_
  
  - [x] 9.2 Display product details with full information
    - Create two-column layout (image on left, details on right) that stacks on mobile
    - Display all product fields: image, title, description, price, category, rating
    - Add "Add to Cart" button (non-functional for now)
    - Add "Back to Home" link using Link component from react-router-dom
    - Style with Tailwind CSS for clean, readable layout
    - _Requirements: 3.3, 3.4, 3.6_
  
  - [ ]* 9.3 Write property test for product details rendering
    - **Property 4: Product Details Rendering**
    - **Validates: Requirements 3.3**
  
  - [ ]* 9.4 Write property test for product details API call
    - **Property 15: Product Details API Call**
    - **Validates: Requirements 3.1**

- [x] 10. Create CartContext for Global State Management
  - [x] 10.1 Create CartContext with state and operations
    - Create `src/context/CartContext.jsx` file
    - Create CartContext using createContext
    - Create CartProvider component that wraps children
    - Initialize cart state with useState (empty array for now, localStorage comes later)
    - Implement addToCart function: check if product exists, if yes increment quantity, if no add with quantity 1
    - Implement removeFromCart function: filter out product by id
    - Implement increaseQuantity function: map through cart and increment quantity for matching id
    - Implement decreaseQuantity function: map through cart, decrement quantity, remove if quantity becomes 0
    - Implement getCartItemCount function: reduce cart to sum of all quantities
    - Implement getCartTotal function: reduce cart to sum of (price * quantity)
    - Provide all state and functions through Context value
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_
  
  - [x] 10.2 Wrap App with CartProvider
    - Import CartProvider in App.jsx
    - Wrap all routes with CartProvider so all components can access cart state
    - _Requirements: 7.1_

- [ ]* 11. Write property tests for cart operations
  - [ ]* 11.1 Write property test for adding new item to cart
    - **Property 6: Add to Cart Creates Cart Item**
    - **Validates: Requirements 4.1**
  
  - [ ]* 11.2 Write property test for adding duplicate item
    - **Property 7: Add to Cart Increases Quantity**
    - **Validates: Requirements 4.2**
  
  - [ ]* 11.3 Write property test for increasing quantity
    - **Property 8: Increase Quantity Operation**
    - **Validates: Requirements 4.4**
  
  - [ ]* 11.4 Write property test for decreasing quantity
    - **Property 9: Decrease Quantity Operation**
    - **Validates: Requirements 4.5**
  
  - [ ]* 11.5 Write property test for removing item
    - **Property 10: Remove from Cart Operation**
    - **Validates: Requirements 4.7**
  
  - [ ]* 11.6 Write property test for cart total calculation
    - **Property 12: Cart Total Calculation**
    - **Validates: Requirements 4.8**

- [x] 12. Connect Add to Cart Button on Product Details
  - Import useContext and CartContext in ProductDetails.jsx
  - Get addToCart function from context
  - Add onClick handler to "Add to Cart" button that calls addToCart(product)
  - Optional: Add visual feedback (toast message or temporary "Added!" text)
  - _Requirements: 3.5_

- [ ]* 13. Write property test for add to cart from product details
  - **Property 6: Add to Cart Creates Cart Item** (integration test)
  - **Validates: Requirements 3.5**

- [x] 14. Implement Cart Page
  - [x] 14.1 Create Cart page with cart display
    - Import useContext and CartContext in Cart.jsx
    - Get cart array and all cart functions from context
    - Conditionally render: empty cart message with link to home if cart is empty, or cart items if cart has items
    - Map through cart items and display each with image, title, price, quantity
    - Add quantity controls: "-" button (decreaseQuantity), quantity display, "+" button (increaseQuantity)
    - Add "Remove" button for each item (removeFromCart)
    - Display item subtotal (price * quantity) for each item
    - Display cart total at bottom using getCartTotal
    - Style with Tailwind CSS for clean layout
    - _Requirements: 4.3, 4.4, 4.5, 4.7, 4.8, 4.9_
  
  - [ ]* 14.2 Write property test for cart items display
    - **Property 11: Cart Items Display Required Fields**
    - **Validates: Requirements 4.3**

- [ ] 15. Add localStorage Persistence to Cart
  - [ ] 15.1 Implement cart persistence
    - In CartContext, modify initial state to load from localStorage using lazy initialization
    - Add useEffect that saves cart to localStorage whenever cart state changes
    - Use try-catch to handle JSON parsing errors (fall back to empty array)
    - Use key "ecommerce-cart" for localStorage
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ]* 15.2 Write property test for localStorage round trip
    - **Property 13: Cart Persistence Round Trip**
    - **Validates: Requirements 5.1, 5.3**
  
  - [ ]* 15.3 Write unit tests for localStorage edge cases
    - Test corrupted localStorage data (invalid JSON)
    - Test empty localStorage (first visit)
    - Test localStorage unavailable (privacy mode)
    - _Requirements: 5.4_

- [x] 16. Create Navbar Component
  - [x] 16.1 Build Navbar with navigation and cart badge
    - Create `src/components/Navbar/Navbar.jsx`
    - Import useContext and CartContext to access getCartItemCount
    - Add Link components for Home ("/") and Cart ("/cart")
    - Display cart item count badge next to Cart link (only show if count > 0)
    - Style with Tailwind CSS: sticky top positioning, background color, padding, flex layout
    - Add responsive mobile menu (hamburger icon that toggles menu visibility on small screens)
    - _Requirements: 6.1, 6.2, 6.3, 6.6_
  
  - [x] 16.2 Add Navbar to App.jsx
    - Import Navbar component
    - Place Navbar above Routes so it appears on all pages
    - _Requirements: 6.1_
  
  - [ ]* 16.3 Write property test for cart count badge
    - **Property 14: Cart Count Badge Display**
    - **Validates: Requirements 6.3**

- [x] 17. Implement 404 Not Found Page
  - Create NotFound.jsx with centered content
  - Display "404 - Page Not Found" heading
  - Add descriptive message
  - Include Link back to home page
  - Style with Tailwind CSS for centered, friendly error page
  - _Requirements: 6.5_

- [ ] 18. Final Polish and Responsive Design
  - Review all pages on mobile, tablet, and desktop sizes using browser DevTools
  - Ensure all grids and layouts are responsive
  - Verify mobile menu in Navbar works correctly
  - Check that all images load and display properly
  - Verify loading states appear and disappear correctly
  - Test all error states display user-friendly messages
  - Add any missing hover effects or transitions
  - Ensure consistent spacing and typography across all pages
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 19. Setup Testing Framework
  - Install Vitest and testing libraries: `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
  - Install fast-check for property-based testing: `npm install -D fast-check`
  - Create vitest.config.js with jsdom environment
  - Create test setup file with testing-library configuration
  - Add test scripts to package.json
  - _Requirements: All testing requirements_

- [ ] 20. Final Checkpoint - Complete Testing and Verification
  - Run all property-based tests (minimum 100 iterations each)
  - Run all unit tests
  - Verify all 15 correctness properties pass
  - Manually test complete user flow: browse → details → add to cart → view cart → adjust quantities
  - Test cart persistence by refreshing browser
  - Test error handling by simulating network failures
  - Verify responsive design on multiple screen sizes
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation follows a progressive learning path: setup → display → interaction → state → persistence
- Checkpoints ensure incremental validation and provide opportunities to ask questions
- Property tests validate universal correctness properties with 100+ randomized inputs
- Unit tests validate specific examples, edge cases, and integration points
- Focus on understanding React fundamentals: components, props, state, effects, context, and routing
