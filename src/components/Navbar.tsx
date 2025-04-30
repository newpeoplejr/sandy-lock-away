
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-beach-blue text-white w-8 h-8 rounded-md flex items-center justify-center">
            <MapPin size={18} />
          </div>
          <span className="font-bold text-lg text-beach-deep-blue">BeachLockers</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex gap-2 items-center"
              >
                <User size={18} />
                <span className="hidden sm:inline">Sign Up</span>
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setIsLoggedIn(false)}
            >
              <User size={18} />
              <span className="hidden sm:inline">My Account</span>
            </Button>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </header>
  );
};

export default Navbar;
