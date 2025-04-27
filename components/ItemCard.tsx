"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Item } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Tag, ChevronRight, Images, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ItemCardProps {
  item: Item;
  view: "grid" | "list";
  onDelete?: (id: string) => void;
}

export function ItemCard({ item, view, onDelete }: ItemCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex < item.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(item.id);
    }
  };

  // Format the date relative to now (e.g. "2 days ago")
  const formattedDate = formatDistanceToNow(new Date(item.dateFound), { addSuffix: true });
  
  // Grid view
  if (view === "grid") {
    return (
      <Link href={`/lost-items/${item.id}`} className="block h-full">
        <div className="h-full flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
          <div 
            className="relative aspect-square bg-muted/40"
            onClick={handleNextImage}
          >
            <img 
              src={item.images[currentImageIndex]} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {item.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-background/80 text-foreground rounded-full py-1 px-2 text-xs font-medium flex items-center">
                <Images className="h-3 w-3 mr-1" />
                {currentImageIndex + 1}/{item.images.length}
              </div>
            )}
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
              <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium whitespace-nowrap">
                {item.category}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mt-2">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>Found {formattedDate}</span>
            </div>
            <p className="text-sm mt-2 line-clamp-2 text-muted-foreground">
              {item.description}
            </p>
            <div className="mt-auto pt-3 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 mt-2">
                View Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              {onDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 text-destructive hover:bg-destructive/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Item</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this item? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(e);
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // List view
  return (
    <Link href={`/lost-items/${item.id}`} className="block w-full">
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card transition-all hover:shadow-md">
        <div 
          className="relative h-24 sm:h-28 sm:w-28 aspect-square bg-muted/40 rounded-md overflow-hidden flex-shrink-0"
          onClick={handleNextImage}
        >
          <img 
            src={item.images[currentImageIndex]} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.images.length > 1 && (
            <div className="absolute bottom-1 right-1 bg-background/80 text-foreground rounded-full py-0.5 px-1.5 text-xs font-medium flex items-center">
              <Images className="h-3 w-3 mr-0.5" />
              {currentImageIndex + 1}/{item.images.length}
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium self-start sm:self-auto">
              {item.category}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
          </div>
          
          <p className="text-sm mt-2 line-clamp-2 text-muted-foreground">
            {item.description}
          </p>
          
          <div className="mt-auto pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" className="mt-1">
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-1 text-destructive hover:bg-destructive/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Item</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this item? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(e);
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}