
import React from 'react';

interface FooterProps {
  supportEmail?: string;
  supportPhone?: string;
}

const Footer = ({ 
  supportEmail = "support@hospitalscheduler.com", 
  supportPhone = "+123 456 7890" 
}: FooterProps) => {
  return (
    <footer className="w-full bg-medgray-300 px-4 py-3 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-sm text-gray-600">
        <div>
          Contact Support: <a href={`mailto:${supportEmail}`} className="hover:underline">{supportEmail}</a>
        </div>
        <div>
          Phone: {supportPhone}
        </div>
        <div>
          <a href="/faq" className="hover:underline">FAQs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
