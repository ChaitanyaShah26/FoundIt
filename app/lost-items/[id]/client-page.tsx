"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Calendar, MapPin, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteItem } from "@/lib/localStorage";

interface ClientItemDetailsPageProps {
  initialItem: Item;
}

export default function ClientItemDetailsPage({ initialItem }: ClientItemDetailsPageProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < initialItem.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const handleContactFinder = () => {
    setShowContactInfo(true);
    toast.success("Contact information revealed", {
      description: "You can now contact the finder to retrieve your item.",
    });
  };

  const handleDeleteItem = () => {
    deleteItem(initialItem.id);
    toast.success("Item deleted successfully", {
      description: "The item has been removed from the list."
    });
    router.push("/lost-items");
  };

  // Format date
  const formattedDate = format(new Date(initialItem.dateFound), "MMMM d, yyyy");

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => router.push("/lost-items")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Lost Items
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted/40 rounded-lg overflow-hidden border">
            <img 
              src={initialItem.images[currentImageIndex]} 
              alt={initialItem.name}
              className="w-full h-full object-contain"
            />
            
            {/* Image navigation */}
            {initialItem.images.length > 1 && (
              <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 bg-gradient-to-t from-black/50 to-transparent">
                <div className="flex space-x-2">
                  {initialItem.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        idx === currentImageIndex ? "bg-white" : "bg-white/50"
                      )}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Image navigation arrows */}
            {initialItem.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                  className={cn(
                    "absolute top-1/2 left-4 transform -translate-y-1/2",
                    "h-8 w-8 rounded-full bg-background/80 flex items-center justify-center",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  aria-label="Previous image"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  disabled={currentImageIndex === initialItem.images.length - 1}
                  className={cn(
                    "absolute top-1/2 right-4 transform -translate-y-1/2",
                    "h-8 w-8 rounded-full bg-background/80 flex items-center justify-center",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  aria-label="Next image"
                >
                  <ArrowLeft className="h-4 w-4 transform rotate-180" />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail gallery */}
          {initialItem.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {initialItem.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={cn(
                    "w-16 h-16 rounded-md overflow-hidden border flex-shrink-0",
                    idx === currentImageIndex && "ring-2 ring-primary"
                  )}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{initialItem.name}</h1>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {initialItem.category}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Found at {initialItem.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Found on {formattedDate}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">
              {initialItem.description}
            </p>
          </div>
          
          {/* Contact Finder Section */}
          <div className="pt-4 border-t">
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
            
            {!showContactInfo ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  To retrieve this item, you'll need to contact the person who found it.
                </p>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleContactFinder}
                >
                  Reveal Contact Information
                </Button>
              </div>
            ) : (
              <div className="space-y-3 bg-muted/30 rounded-lg p-4 border">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{initialItem.finder.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a 
                    href={`mailto:${initialItem.finder.email}`} 
                    className="text-primary hover:underline"
                  >
                    {initialItem.finder.email}
                  </a>
                </div>
                {initialItem.finder.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a 
                      href={`tel:${initialItem.finder.phone}`} 
                      className="text-primary hover:underline"
                    >
                      {initialItem.finder.phone}
                    </a>
                  </div>
                )}
                <p className="text-sm text-muted-foreground pt-2">
                  Please contact the finder to arrange pickup of your item. Be prepared to 
                  provide specific details about the item to verify your ownership.
                </p>
              </div>
            )}
          </div>

          {/* Delete Button */}
          <div className="pt-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleDeleteItem}
            >
              Delete Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 