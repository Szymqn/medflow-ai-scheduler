
import React from 'react';

interface LogoProps {
  title?: string;
}

const Logo = ({ title = "Hospital Scheduler" }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
<<<<<<< HEAD
      <img src="/lovable-uploads/logo.svg" alt="Logo" className="h-10 w-11" /> <span className="font-semibold text-lg text-[#032b58]">{title}</span>
=======
      <img src="/lovable-uploads/logo.svg" alt="Logo" className="h-10 w-11" /> 
      <span className="font-semibold text-lg text-[#032b58]">{title}</span>
>>>>>>> 2ead0770f9d14c3efeaed52b3bd1ecdee679c0c4
    </div>
  );
};

export default Logo;
