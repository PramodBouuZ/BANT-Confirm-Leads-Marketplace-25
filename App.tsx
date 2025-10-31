
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EnquirySection from './components/EnquirySection';
import ProductCatalog from './components/ProductCatalog';
import VendorSection from './components/VendorSection';
import FeedbackSection from './components/FeedbackSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <EnquirySection />
        <ProductCatalog />
        <VendorSection />
        <FeedbackSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
