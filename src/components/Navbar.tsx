
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  hospitalName?: string;
  userName?: string;
  userRole?: 'patient' | 'medical';
}

const Navbar = ({ hospitalName = "Sacred Heart Hospital", userName, userRole }: NavbarProps) => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, this would clear auth state and redirect to login
  };

  return (
    <nav className="w-full bg-medgray-300 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo title={hospitalName} />
        {userName && (
          <span className="text-sm text-gray-600">
            {userRole === 'patient' ? 'Patient: ' : 'Login: '}
            {userName}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {userRole && (
          <>
            <Link to="/profile">
              <Button variant="ghost" className="rounded-full bg-coral-100 text-coral hover:bg-coral-200 hover:text-coral-700">
                My Profile
              </Button>
            </Link>
            
            <Link to="/operations">
              <Button variant="ghost" className="rounded-full bg-coral-100 text-coral hover:bg-coral-200 hover:text-coral-700">
                {userRole === 'patient' ? 'My Operations' : 'Operations'}
              </Button>
            </Link>
            
            <Link to="/calendar">
              <Button variant="ghost" className="rounded-full bg-coral-100 text-coral hover:bg-coral-200 hover:text-coral-700">
                Calendar
              </Button>
            </Link>
            
            <Link to="/tests">
              <Button variant="ghost" className="rounded-full bg-coral-100 text-coral hover:bg-coral-200 hover:text-coral-700">
                {userRole === 'patient' ? 'My Tests' : 'Tests'}
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="ghost" className="rounded-full bg-coral-100 text-coral hover:bg-coral-200 hover:text-coral-700">
                Contact
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              className="rounded-full bg-coral-100 text-coral hover:bg-coral-200 hover:text-coral-700"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
