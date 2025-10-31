
import React from 'react';
import { Vendor } from '../App';

interface VendorSectionProps {
    vendors: Vendor[];
}

const VendorSection: React.FC<VendorSectionProps> = ({ vendors }) => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center mb-4">Partnered with Industry-Leading Vendors</h2>
          <p className="text-center text-gray-600 mb-12">We partner with leading technology companies trusted by enterprise clients and technical teams to bring you the best-in-class IT solutions.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {vendors.map((vendor, index) => (
            <div 
              key={vendor.id} 
              className="flex justify-center items-center p-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${50 * index}ms`, animationFillMode: 'forwards' }}
            >
              <img 
                src={vendor.logoUrl} 
                alt={`Vendor ${index + 1}`} 
                className="max-h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
