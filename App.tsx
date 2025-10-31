
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EnquirySection from './components/EnquirySection';
import ProductCatalog from './components/ProductCatalog';
import VendorSection from './components/VendorSection';
import FeedbackSection from './components/FeedbackSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AboutUsPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import CommissionPolicyPage from './components/CommissionPolicyPage';
import ProfilePage from './components/ProfilePage';
import BantyAssistant from './components/BantyAssistant';

export type Page = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'commission' | 'profile';

export interface User {
  name: string;
  email: string;
  mobile: string;
  company: string;
  location: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [prefilledEnquiry, setPrefilledEnquiry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductsCount, setFilteredProductsCount] = useState<number | null>(null);

  useEffect(() => {
    if (filteredProductsCount === 0 && searchTerm.trim() !== '') {
      console.log(`[Admin Panel Record] Unmatched search keyword: "${searchTerm}"`);
    }
  }, [filteredProductsCount, searchTerm]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    // Simulate fetching user data after login. In a real app, this would come from the auth response.
    setUser({
      name: 'Anil Kumar',
      email: 'anil.kumar@example.com',
      mobile: '9876543210',
      company: 'Tech Solutions Inc.',
      location: 'Bengaluru, India',
    });
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate('home');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    // Here you would typically make an API call to save the data
    console.log("User profile updated:", updatedUser);
  };

  const handleEnquiryPrefill = (text: string) => {
    setPrefilledEnquiry(text);
    document.getElementById('enquiry-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearPrefilledEnquiry = () => {
    setPrefilledEnquiry('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUsPage />;
      case 'contact':
        return <ContactUsPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'commission':
        return <CommissionPolicyPage />;
      case 'profile':
        return user ? <ProfilePage user={user} onUpdateUser={handleUserUpdate} /> : null;
      case 'home':
      default:
        return (
          <>
            <HeroSection />
            <EnquirySection 
              isLoggedIn={isLoggedIn} 
              prefilledEnquiry={prefilledEnquiry}
              clearPrefilledEnquiry={clearPrefilledEnquiry}
            />
            <ProductCatalog
              isLoggedIn={isLoggedIn}
              onEnquiryPrefill={handleEnquiryPrefill}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onFilterChange={setFilteredProductsCount}
            />
            <VendorSection />
            <FeedbackSection />
            <FaqSection />
            <BantyAssistant
              onSearch={setSearchTerm}
              filteredProductsCount={filteredProductsCount}
              onCantFind={() => handleEnquiryPrefill("I was looking for a specific solution but couldn't find it. Can you help me?")}
            />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onNavigate={navigate} 
        isLoggedIn={isLoggedIn} 
        user={user}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
