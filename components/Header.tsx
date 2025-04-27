"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, BookOpen } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-primary font-bold text-xl"
            >
              <BookOpen className="h-6 w-6" />
              <span>FoundIt</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/lost-items" className="text-foreground hover:text-primary transition-colors">
              Find Lost Item
            </Link>
            <Link href="/report-item" className="text-foreground hover:text-primary transition-colors">
              Report Found Item
            </Link>
            <ModeToggle />
            <Button asChild variant="default">
              <Link href="/lost-items" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Search Items
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              href="/lost-items" 
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Lost Item
            </Link>
            <Link 
              href="/report-item" 
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Report Found Item
            </Link>
            <Button asChild className="w-full">
              <Link 
                href="/lost-items" 
                className="flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Items
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}