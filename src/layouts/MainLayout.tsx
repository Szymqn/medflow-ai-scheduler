
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  hospitalName?: string;
  userName?: string;
  userRole?: 'patient' | 'medical';
}

const MainLayout = ({ 
  children,
  hospitalName,
  userName,
  userRole
}: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        hospitalName={hospitalName}
        userName={userName}
        userRole={userRole}
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
