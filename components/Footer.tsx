import Link from "next/link";
import { Github, Mail, BookOpen, PhoneCallIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary font-bold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>FoundIt</span>
            </div>
            <p className="text-muted-foreground">
              Helping students reconnect with their lost belongings since 2025.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/lost-items" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Find Lost Item
                </Link>
              </li>
              <li>
                <Link 
                  href="/report-item" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Report Found Item
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">support@foundit.edu</span>
              </li>
              <li className="flex items-center space-x-2">
              <PhoneCallIcon className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">+91 94235xxxxx</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FoundIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}