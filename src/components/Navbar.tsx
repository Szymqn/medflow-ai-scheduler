
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  hospitalName?: string;
  userName?: string;
  userRole?: 'patient' | 'medical';
}

const Navbar = ({ hospitalName = "MedFlow", userName, userRole }: NavbarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, this would clear auth state and redirect to login
    navigate('/');
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
              <Button variant="ghost" className="rounded-full bg-[#06629b] text-white hover:bg-[#0773b6] hover:text-white">
                My Profile
              </Button>
            </Link>

            <Link to="/medical-dashboard">
              <Button variant="ghost" className="rounded-full bg-[#06629b] text-white hover:bg-[#0773b6] hover:text-white">
                Dashboard
              </Button>
            </Link>
            
            <Link to="/operations">
              <Button variant="ghost" className="rounded-full bg-[#06629b] text-white hover:bg-[#0773b6] hover:text-white">
                {/* {userRole === 'patient' ? 'My Operations' : 'Operations'} */}
                Operations
              </Button>
            </Link>
            
            <Link to="/calendar">
              <Button variant="ghost" className="rounded-full bg-[#06629b] text-white hover:bg-[#0773b6] hover:text-white">
                Calendar
              </Button>
            </Link>
            
            <Link to="/tests">
              <Button variant="ghost" className="rounded-full bg-[#06629b] text-white hover:bg-[#0773b6] hover:text-white">
                {/* {userRole === 'patient' ? 'My Tests' : 'Tests'} */}
                Tests
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="ghost" className="rounded-full bg-[#06629b] text-white hover:bg-[#0773b6] hover:text-white">
                Contact
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              className="rounded-full bg-[#06629b] text-white hover:bg-[#0773b6] hover:text-white"
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
