import { createContext, useState } from 'react';

// Create Context
export const SearchContext = createContext();

// Provider Component
export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to update search query
  const updateSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  const value = {
    searchQuery,
    updateSearch,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}
