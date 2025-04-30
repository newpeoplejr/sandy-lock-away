
import { useState } from "react";
import { lockerLocations } from "@/data/lockers";
import LockerCard from "@/components/LockerCard";
import Map from "@/components/Map";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMap, setShowMap] = useState(true);
  
  const filteredLocations = lockerLocations.filter(
    (locker) =>
      locker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      locker.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container pt-20 pb-10">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-beach-blue to-beach-deep-blue opacity-80"></div>
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-20 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Secure Beach Storage Made Simple
            </h1>
            <p className="text-lg max-w-xl mb-8 opacity-90">
              Find and book secure lockers near your favorite beaches. Enjoy your time worry-free!
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white/90 border-none text-slate-800 placeholder:text-slate-400 rounded-lg w-full"
              />
            </div>
          </div>
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200')",
            }}
          ></div>
        </section>

        {/* Controls */}
        <section className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-beach-deep-blue">
            {filteredLocations.length} Locker{filteredLocations.length !== 1 ? "s" : ""} Available
          </h2>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <Filter size={16} />
              Filter
            </Button>
            <Button 
              variant={showMap ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => setShowMap(true)}
            >
              <MapPin size={16} />
              Map View
            </Button>
            <Button 
              variant={showMap ? "outline" : "default"}
              size="sm"
              className="gap-2"
              onClick={() => setShowMap(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              List View
            </Button>
          </div>
        </section>

        {/* Map View */}
        {showMap && (
          <section className="mb-8">
            <Map />
          </section>
        )}

        {/* Locker Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((locker) => (
            <LockerCard key={locker.id} locker={locker} />
          ))}
          
          {filteredLocations.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-beach-deep-blue mb-2">No lockers found</h3>
              <p className="text-beach-gray mb-4">Try adjusting your search criteria</p>
              <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
            </div>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container text-center text-sm text-beach-gray">
          <p className="mb-2">© 2025 BeachLockers. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-beach-deep-blue">Terms</a>
            <a href="#" className="hover:text-beach-deep-blue">Privacy</a>
            <a href="#" className="hover:text-beach-deep-blue">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
