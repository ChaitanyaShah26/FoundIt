import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, FileText, MapPin, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-900/30 dark:to-purple-900/30" />
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block">Lost Something on Campus?</span>
            <span className="block mt-2 text-primary">FoundIt Can Help You Find It</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our campus lost and found platform makes it easy to report and retrieve lost items.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Button asChild size="lg" className="text-md">
              <Link href="/lost-items">
                <Search className="mr-2 h-5 w-5" />
                Find Lost Item
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-md">
              <Link href="/report-item">
                <FileText className="mr-2 h-5 w-5" />
                Report Found Item
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 text-center shadow-sm transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Report Found Items</h3>
              <p className="text-muted-foreground">
                Found something on campus? Report it with details and photos to help reconnect it with its owner.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center shadow-sm transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Search Lost Items</h3>
              <p className="text-muted-foreground">
                Looking for something you've lost? Browse through reported items or use our powerful search filters.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 text-center shadow-sm transition-all hover:shadow-md">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Retrieve</h3>
              <p className="text-muted-foreground">
                Found your item? Contact the finder directly through our platform to arrange pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Helping Students Reconnect</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6">
              <p className="text-4xl font-bold text-primary mb-2">200+</p>
              <p className="text-lg text-muted-foreground">Items Recovered</p>
            </div>
            
            <div className="p-6">
              <p className="text-4xl font-bold text-primary mb-2">95%</p>
              <p className="text-lg text-muted-foreground">Success Rate</p>
            </div>
            
            <div className="p-6">
              <p className="text-4xl font-bold text-primary mb-2">15</p>
              <p className="text-lg text-muted-foreground">Campus Locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Find Your Lost Item?</h2>
                <p className="text-muted-foreground mb-6">
                  Start searching our database of found items or report an item you've found on campus.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link href="/lost-items">Start Searching</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/report-item">Report Item</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative min-h-[300px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:16px_16px]"></div>
                </div>
                <div className="relative text-white text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold mb-2">Central Lost & Found Office</h3>
                  <p className="text-white/80">
                    Student Center, Room 101<br />
                    Monday - Friday: 9am - 5pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}