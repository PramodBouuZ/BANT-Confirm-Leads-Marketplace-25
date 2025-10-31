
import React, { useState } from 'react';
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

export type Page = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'commission';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
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
      case 'home':
      default:
        return (
          <>
            <HeroSection />
            <EnquirySection />
            <ProductCatalog />
            <VendorSection />
            <FeedbackSection />
            <FaqSection />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
