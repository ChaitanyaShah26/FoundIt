"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { getItemById } from "@/lib/localStorage";
import { Item } from "@/types";
import ClientItemDetailsPage from "./client-page";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      // Fetch item by ID
      const foundItem = getItemById(params.id as string);
      
      // Simulate loading for better UX
      setTimeout(() => {
        setItem(foundItem || null);
        setLoading(false);
      }, 300);
    }
  }, [params.id]);

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-32 bg-muted rounded w-full"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If item not found, return 404
  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The item you're looking for doesn't exist or may have been removed.
          </p>
          <button 
            onClick={() => router.push("/lost-items")}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Back to Lost Items
          </button>
        </div>
      </div>
    );
  }
  
  // Pass the item to the client component
  return <ClientItemDetailsPage initialItem={item} />;
}