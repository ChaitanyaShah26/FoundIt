"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  maxImages?: number;
  onChange: (images: string[]) => void;
  value?: string[];
}

export function ImageUpload({ maxImages = 5, onChange, value = [] }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const promises: Promise<void>[] = [];

    // Convert only the first maxImages - current images length
    const filesToProcess = Array.from(files).slice(0, maxImages - images.length);

    filesToProcess.forEach((file) => {
      const promise = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onChange(updatedImages);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-square rounded-md overflow-hidden border bg-muted/40"
          >
            <img 
              src={image} 
              alt={`Uploaded image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center gap-1",
              "text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors",
              "bg-muted/40 hover:bg-muted/60"
            )}
          >
            <Upload className="h-6 w-6" />
            <span className="text-sm">Upload</span>
          </button>
        )}
      </div>

      {images.length < maxImages && (
        <div className="text-sm text-muted-foreground">
          {images.length > 0 
            ? `${images.length} of ${maxImages} images uploaded` 
            : "Upload up to 5 images of the found item"}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        aria-label="Upload images"
      />
    </div>
  );
}