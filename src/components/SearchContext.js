import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [isFilteredSearch, setIsFilteredSearch] = useState(false);

  return (
    <SearchContext.Provider value={{ isFilteredSearch, setIsFilteredSearch }}>
      {children}
    </SearchContext.Provider>
  );
};