
import React, { useState, useEffect, useRef } from 'react';
import { Page, User } from '../App';
import AuthModal from './AuthModal';

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

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

interface HeaderProps {
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  user: User | null;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isLoggedIn, user, onLoginSuccess, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  const profileMenuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openAuthModal = (view: 'login' | 'signup') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };
  
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    onLoginSuccess();
    closeAuthModal();
  };
  
  const navLinks = [
    { page: 'about' as Page, label: 'About Us' },
    { page: 'contact' as Page, label: 'Contact Us' },
  ];

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40 animate-fade-in-down" style={{ animationFillMode: 'forwards' }}>
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
              {isLoggedIn && user ? (
                <div className="relative" ref={profileMenuRef}>
                    <button 
                        onClick={() => setIsProfileMenuOpen(prev => !prev)}
                        className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 font-medium transition-colors"
                    >
                        <span>{user.name.split(' ')[0]}</span>
                        <svg className={`w-5 h-5 ml-1 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fade-in">
                            <button
                                onClick={() => { onNavigate('profile'); setIsProfileMenuOpen(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                               <UserIcon /> Profile
                            </button>
                            <button
                                onClick={() => { onLogout(); setIsProfileMenuOpen(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            >
                                <LogoutIcon /> Logout
                            </button>
                        </div>
                    )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors opacity-0 animate-fade-in-down"
                    style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors opacity-0 animate-fade-in-down"
                    style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
                  >
                    Sign-up
                  </button>
                </>
              )}
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
              {isLoggedIn ? (
                  <>
                  <button onClick={() => { onNavigate('profile'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100">
                    Profile
                  </button>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="block w-full text-left bg-red-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-600">
                    Logout
                  </button>
                  </>
              ) : (
                <>
                  <button onClick={() => openAuthModal('login')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100">
                    Login
                  </button>
                  <button onClick={() => openAuthModal('signup')} className="block w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                    Sign-up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal}
        initialView={authModalView}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Header;
