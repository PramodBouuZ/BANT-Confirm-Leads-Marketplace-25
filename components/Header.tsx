
import React, { useState } from 'react';
import { Page } from '../App';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface HeaderProps {
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { page: 'about' as Page, label: 'About Us' },
    { page: 'contact' as Page, label: 'Contact Us' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 animate-fade-in-down" style={{ animationFillMode: 'forwards' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => onNavigate('home')} className="text-2xl font-bold cursor-pointer">
              <span className="text-blue-600">BANT</span>
              <span className="text-yellow-400">Confirm</span>
            </button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <button
                key={link.label} 
                onClick={() => onNavigate(link.page)}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors opacity-0 animate-fade-in-down"
                style={{ animationDelay: `${100 * (index + 2)}ms`, animationFillMode: 'forwards' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors opacity-0 animate-fade-in-down"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              Login
            </a>
            <a 
              href="#" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors opacity-0 animate-fade-in-down"
              style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
            >
              Sign-up
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-blue-600">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button key={link.label} onClick={() => { onNavigate(link.page); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100">
                {link.label}
              </button>
            ))}
             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              Login
            </a>
            <a href="#" className="block w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
              Sign-up
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
