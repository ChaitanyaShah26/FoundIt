"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ImageUpload";
import { addItem } from "@/lib/localStorage";
import { CATEGORIES, LOCATIONS } from "@/types";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(1, "Please select where you found the item"),
  dateFound: z.string().min(1, "Please select when you found the item"),
  description: z.string().min(10, "Please provide a brief description (min 10 characters)"),
  finderName: z.string().min(2, "Your name must be at least 2 characters"),
  finderEmail: z.string().email("Please enter a valid email address"),
  finderPhone: z.string().optional(),
  images: z.array(z.string()).min(1, "Please upload at least one image of the item"),
});

export default function ReportItemPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      location: "",
      dateFound: new Date().toISOString().split("T")[0],
      description: "",
      finderName: "",
      finderEmail: "",
      finderPhone: "",
      images: [],
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Create new item to store in localStorage
      const newItem = {
        id: uuidv4(),
        name: values.name,
        category: values.category,
        location: values.location,
        dateFound: values.dateFound,
        description: values.description,
        images: values.images,
        finder: {
          name: values.finderName,
          email: values.finderEmail,
          phone: values.finderPhone,
        },
        createdAt: new Date().toISOString(),
      };
      
      // Add item to localStorage
      addItem(newItem);
      
      // Show success message and redirect
      toast({
        title: "Item reported successfully!",
        description: "Thank you for helping return this item to its owner.",
      });
      
      // Redirect to lost items page after submission
      router.push("/lost-items");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error reporting item",
        description: "There was a problem submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Report a Found Item</h1>
          <p className="text-muted-foreground">
            Fill out this form with details about the item you found to help reconnect it with its owner.
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Item Details Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Item Details</h2>

                {/* Item Images */}
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Images</FormLabel>
                      <FormControl>
                        <ImageUpload
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload clear images of the item to help with identification.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Item Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Blue Backpack, iPhone 15" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a clear, concise name for the item.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the category that best describes the item.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location Found */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Found</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select where you found it" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LOCATIONS.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the location where you found the item.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Found */}
                <FormField
                  control={form.control}
                  name="dateFound"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Found</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} max={new Date().toISOString().split("T")[0]} />
                      </FormControl>
                      <FormDescription>
                        Select the date when you found the item.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide additional details about the item..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Describe the item in detail including color, brand, condition, and any identifying features.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Your Information Section */}
              <div className="space-y-6 pt-4 border-t">
                <h2 className="text-xl font-semibold">Your Information</h2>
                <p className="text-sm text-muted-foreground">
                  Your contact information will be shared with the owner to coordinate pickup.
                </p>

                {/* Finder Name */}
                <FormField
                  control={form.control}
                  name="finderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Finder Email */}
                <FormField
                  control={form.control}
                  name="finderEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="you@example.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Finder Phone (Optional) */}
                <FormField
                  control={form.control}
                  name="finderPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="+91 1234567890" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Optional alternative contact method.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}