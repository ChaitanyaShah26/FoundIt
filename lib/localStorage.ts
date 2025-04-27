import { Item } from "@/types";

// Key for storing items in localStorage
const ITEMS_STORAGE_KEY = "lost-found-items";

// Get all items from localStorage
export const getItems = (): Item[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const items = localStorage.getItem(ITEMS_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error getting items from localStorage:", error);
    return [];
  }
};

// Add a new item to localStorage
export const addItem = (item: Item): void => {
  if (typeof window === "undefined") return;
  
  try {
    const items = getItems();
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify([...items, item]));
  } catch (error) {
    console.error("Error adding item to localStorage:", error);
  }
};

// Delete an item by ID
export const deleteItem = (id: string): void => {
  if (typeof window === "undefined") return;
  
  try {
    const items = getItems();
    const filteredItems = items.filter(item => item.id !== id);
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(filteredItems));
  } catch (error) {
    console.error("Error deleting item from localStorage:", error);
  }
};

// Get a single item by ID
export const getItemById = (id: string): Item | undefined => {
  const items = getItems();
  return items.find(item => item.id === id);
};

// Search and filter items
export const searchAndFilterItems = (
  search: string = "",
  category: string = "",
  location: string = "",
  dateFrom: string = "",
  dateTo: string = ""
): Item[] => {
  let items = getItems();
  
  // Search by name or description
  if (search) {
    const searchLower = search.toLowerCase();
    items = items.filter(
      item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Filter by category
  if (category) {
    items = items.filter(item => item.category === category);
  }
  
  // Filter by location
  if (location) {
    items = items.filter(item => item.location === location);
  }
  
  // Filter by date range
  if (dateFrom) {
    items = items.filter(item => new Date(item.dateFound) >= new Date(dateFrom));
  }
  
  if (dateTo) {
    items = items.filter(item => new Date(item.dateFound) <= new Date(dateTo));
  }
  
  // Sort by date (newest first)
  return items.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Clear all items (for testing purposes)
export const clearItems = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ITEMS_STORAGE_KEY);
};