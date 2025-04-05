
import React from 'react';
import { Building2 } from 'lucide-react';

interface LogoProps {
  title?: string;
}

const Logo = ({ title = "Hospital Scheduler" }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <Building2 className="h-6 w-6 text-gray-900" />
      <span className="font-semibold text-lg text-gray-900">{title}</span>
    </div>
  );
};

export default Logo;
