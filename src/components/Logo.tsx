
import React from 'react';
import { Building2 } from 'lucide-react';

interface LogoProps {
  title?: string;
}

const Logo = ({ title = "Hospital Scheduler" }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <img src="public/lovable-uploads/logo.svg" alt="Logo" className="h-10 w-11" /> <span className="font-semibold text-lg text-[#032b58]">{title}</span>
    </div>
  );
};

export default Logo;
