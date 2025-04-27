"use client";

import { useState, useEffect } from "react";
import { Item } from "@/types";
import { getItems, searchAndFilterItems } from "@/lib/localStorage";

interface UseItemsProps {
  initialSearch?: string;
  initialCategory?: string;
  initialLocation?: string;
  initialDateFrom?: string;
  initialDateTo?: string;
}

export function useItems({
  initialSearch = "",
  initialCategory = "",
  initialLocation = "",
  initialDateFrom = "",
  initialDateTo = "",
}: UseItemsProps = {}) {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const [dateFrom, setDateFrom] = useState(initialDateFrom);
  const [dateTo, setDateTo] = useState(initialDateTo);
  const [isLoading, setIsLoading] = useState(true);

  // Load items on component mount and when filters change
  useEffect(() => {
    setIsLoading(true);
    
    // Small timeout to simulate loading
    const timer = setTimeout(() => {
      const filteredItems = searchAndFilterItems(
        searchTerm,
        category,
        location,
        dateFrom,
        dateTo
      );
      setItems(filteredItems);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, category, location, dateFrom, dateTo]);

  // Clear all filters
  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setDateFrom("");
    setDateTo("");
  };

  // Get a count of active filters
  const getFiltersCount = () => {
    let count = 0;
    if (category) count++;
    if (location) count++;
    if (dateFrom) count++;
    if (dateTo) count++;
    return count;
  };

  return {
    items,
    isLoading,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    location,
    setLocation,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    clearFilters,
    filtersCount: getFiltersCount(),
  };
}