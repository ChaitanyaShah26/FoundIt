"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Grid, List, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ItemCard } from "@/components/ItemCard";
import { searchAndFilterItems, deleteItem } from "@/lib/localStorage";
import { CATEGORIES, LOCATIONS, Item } from "@/types";
import { toast } from "sonner";

export default function LostItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersApplied, setFiltersApplied] = useState(0);

  // Load items on page load and when filters change
  useEffect(() => {
    setIsLoading(true);
    
    // Using setTimeout to simulate network delay (remove in production)
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
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, category, location, dateFrom, dateTo]);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (category) count++;
    if (location) count++;
    if (dateFrom) count++;
    if (dateTo) count++;
    setFiltersApplied(count);
  }, [category, location, dateFrom, dateTo]);

  // Clear all filters
  const clearFilters = () => {
    setCategory("");
    setLocation("");
    setDateFrom("");
    setDateTo("");
  };

  // Handle item deletion
  const handleDeleteItem = (id: string) => {
    deleteItem(id);
    
    // Update the items list without reloading the page
    setItems(items.filter(item => item.id !== id));
    
    toast.success("Item deleted successfully", {
      description: "The item has been removed from the lost & found list."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lost Items</h1>
        <p className="text-muted-foreground">
          Browse through items that have been found on campus.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                {/*<Button variant="outline" className="flex-shrink-0">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {filtersApplied > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      {filtersApplied}
                    </span>
                  )}
                </Button>*/}
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Items</SheetTitle>
                  <SheetDescription>
                    Narrow down your search with these filters.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        {LOCATIONS.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Found (From)</label>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Found (To)</label>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                  
                  <div className="pt-4 flex gap-3">
                    <Button onClick={clearFilters} variant="outline" className="flex-1">
                      Clear All
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* View Toggle */}
            <div className="border rounded-md p-1 flex">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("grid")}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("list")}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Active Filters */}
        {filtersApplied > 0 && (
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {category && (
              <div className="flex items-center bg-muted text-foreground rounded-full py-1 px-3 text-sm">
                <span>Category: {category}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => setCategory("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {location && (
              <div className="flex items-center bg-muted text-foreground rounded-full py-1 px-3 text-sm">
                <span>Location: {location}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => setLocation("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {dateFrom && (
              <div className="flex items-center bg-muted text-foreground rounded-full py-1 px-3 text-sm">
                <span>From: {dateFrom}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => setDateFrom("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {dateTo && (
              <div className="flex items-center bg-muted text-foreground rounded-full py-1 px-3 text-sm">
                <span>To: {dateTo}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => setDateTo("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={clearFilters}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Items Grid/List */}
      {isLoading ? (
        // Loading state
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card animate-pulse">
              <div className="aspect-square bg-muted"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-8 bg-muted rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className={view === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "flex flex-col space-y-4"
        }>
          {items.map((item) => (
            <ItemCard 
              key={item.id} 
              item={item} 
              view={view} 
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-16 border rounded-lg bg-muted/20">
          <div className="max-w-md mx-auto space-y-4">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No items found</h3>
            <p className="text-muted-foreground">
              No items match your current search criteria. Try changing your search or filters.
            </p>
            {(searchTerm || filtersApplied > 0) && (
              <Button onClick={() => {
                setSearchTerm("");
                clearFilters();
              }}>
                Clear Search & Filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}