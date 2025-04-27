export interface Item {
  id: string;
  name: string;
  category: string;
  location: string;
  dateFound: string;
  description: string;
  images: string[]; // Base64 encoded images
  finder: {
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
}

export type ItemCategory = 
  | "Electronics" 
  | "Clothing" 
  | "Accessories" 
  | "Books" 
  | "Documents" 
  | "Keys" 
  | "Other";

export const CATEGORIES: ItemCategory[] = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Books",
  "Documents",
  "Keys",
  "Other"
];

export const LOCATIONS = [
  "Library",
  "Student Center",
  "Cafeteria",
  "Gym",
  "Lecture Hall A",
  "Lecture Hall B",
  "Science Building",
  "Arts Building",
  "Dormitory",
  "Parking Lot",
  "Other"
];