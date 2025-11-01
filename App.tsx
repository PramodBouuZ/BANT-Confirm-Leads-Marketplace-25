
import React, { useState, useEffect, useRef } from 'react';
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
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';
import ProactiveAssistant from './components/ProactiveAssistant';

export type Page = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'commission' | 'profile' | 'adminLogin' | 'adminDashboard';

export interface User {
  name: string;
  email: string;
  mobile: string;
  company: string;
  location: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  vendor: string;
  price: string;
  features: string[];
  imageUrl: string;
}

export interface Banner {
    id: number;
    image: string;
}

export interface Vendor {
    id: number;
    logoUrl: string;
}

export type EnquiryStatus = 'New' | 'Approved' | 'Rejected' | 'Assigned';

export interface Enquiry {
    id: number;
    enquiryText: string;
    budget: string;
    authority: string;
    need: string;
    timeline: string;
    // User details from submission
    userName: string;
    userEmail: string;
    userMobile: string;
    userCompany: string;
    userLocation: string;
    status: EnquiryStatus;
    assignedVendor?: string;
}


// MOCK DATA
const initialProducts: Product[] = [
  { id: 1, name: 'ProCRM Suite', category: 'CRM Software', vendor: 'SalesForce', price: '₹3,999/user/month', features: ['Lead Management', 'Sales Automation', 'Analytics Dashboard'], imageUrl: 'https://picsum.photos/400/300?random=11' },
  { id: 2, name: 'CloudERP Enterprise', category: 'ERP Solution', vendor: 'Oracle', price: 'Custom Pricing', features: ['Finance & Accounting', 'Inventory Control', 'HR Management'], imageUrl: 'https://picsum.photos/400/300?random=12' },
  { id: 3, name: 'CyberGuard Security', category: 'Cybersecurity', vendor: 'McAfee', price: '₹79,999/year', features: ['Threat Detection', 'Firewall Protection', 'Endpoint Security'], imageUrl: 'https://picsum.photos/400/300?random=13' },
  { id: 4, name: 'DataVizz Pro', category: 'Business Intelligence', vendor: 'Tableau', price: '₹5,800/user/month', features: ['Interactive Dashboards', 'Data Visualization', 'Predictive Analytics'], imageUrl: 'https://picsum.photos/400/300?random=14' },
  { id: 5, name: 'ConnectFlow HRMS', category: 'HR Software', vendor: 'Zoho', price: '₹650/employee/month', features: ['Payroll Processing', 'Attendance Tracking', 'Performance Review'], imageUrl: 'https://picsum.photos/400/300?random=15' },
  { id: 6, name: 'AgileSprint Project Mgmt', category: 'Project Management', vendor: 'Atlassian', price: 'Free Tier Available', features: ['Kanban Boards', 'Gantt Charts', 'Time Tracking'], imageUrl: 'https://picsum.photos/400/300?random=16' },
];

const initialBanners: Banner[] = [
  { id: 1, image: 'https://picsum.photos/1200/500?random=1' },
  { id: 2, image: 'https://picsum.photos/1200/500?random=2' },
  { id: 3, image: 'https://picsum.photos/1200/500?random=3' },
  { id: 4, image: 'https://picsum.photos/1200/500?random=4' },
  { id: 5, image: 'https://picsum.photos/1200/500?random=5' },
];

const initialVendors: Vendor[] = [
    { id: 1, logoUrl: 'https://logo.clearbit.com/microsoft.com' },
    { id: 2, logoUrl: 'https://logo.clearbit.com/salesforce.com' },
    { id: 3, logoUrl: 'https://logo.clearbit.com/oracle.com' },
    { id: 4, logoUrl: 'https://logo.clearbit.com/sap.com' },
    { id: 5, logoUrl: 'https://logo.clearbit.com/adobe.com' },
    { id: 6, logoUrl: 'https://logo.clearbit.com/ibm.com' },
];


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [prefilledEnquiry, setPrefilledEnquiry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductsCount, setFilteredProductsCount] = useState<number | null>(null);
  const [unmatchedSearches, setUnmatchedSearches] = useState<string[]>([]);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');

  // Centralized State
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  // Proactive Assistant State
  const [hasPostedEnquiry, setHasPostedEnquiry] = useState(false);
  const [showProactiveAssistant, setShowProactiveAssistant] = useState(false);
  const hasPostedEnquiryRef = useRef(hasPostedEnquiry);
  
  // Ref to track if the new enquiry simulation has been triggered
  const simulationTriggered = useRef(false);

  useEffect(() => {
      hasPostedEnquiryRef.current = hasPostedEnquiry;
  }, [hasPostedEnquiry]);

  useEffect(() => {
    if (filteredProductsCount === 0 && searchTerm.trim() !== '') {
      setUnmatchedSearches(prev => {
        const newTerm = searchTerm.trim();
        if (!prev.some(item => item.toLowerCase() === newTerm.toLowerCase())) {
          return [...prev, newTerm];
        }
        return prev;
      });
    }
  }, [filteredProductsCount, searchTerm]);
  
  // Simulate a new enquiry arriving after admin logs in to test notifications
  useEffect(() => {
    if (isAdminLoggedIn && !simulationTriggered.current) {
      simulationTriggered.current = true; // Ensure it only runs once per login session
      const simulationTimer = setTimeout(() => {
        const simulatedEnquiry: Enquiry = {
          id: Date.now(),
          enquiryText: "Simulated: We need a cloud-based project management tool for a team of 50 developers.",
          budget: "₹8,00,000 Annually",
          authority: "VP of Engineering",
          need: "Centralize project tracking",
          timeline: "Next quarter",
          userName: "Simran Kaur",
          userEmail: "simran.k@example.net",
          userMobile: "9988776655",
          userCompany: "Innovate Forward",
          userLocation: "Hyderabad, India",
          status: 'New',
        };
        setEnquiries(prev => [simulatedEnquiry, ...prev]);
      }, 10000); // 10 seconds after admin dashboard loads

      return () => clearTimeout(simulationTimer);
    }
  }, [isAdminLoggedIn]);

  useEffect(() => {
      // FIX: Replaced NodeJS.Timeout with number, which is the correct return type for setTimeout in a browser environment.
      let timerId: number | null = null;
      let hasScrolledPastThreshold = false;

      const handleScroll = () => {
          if (window.scrollY > 200) { // A reasonable scroll depth to indicate engagement
              hasScrolledPastThreshold = true;
              window.removeEventListener('scroll', handleScroll); // Remove after triggering to prevent re-checks
          }
      };
      
      // This logic is only for the home page for non-logged-in-admins
      if (currentPage === 'home' && !isAdminLoggedIn) {
          window.addEventListener('scroll', handleScroll, { passive: true });

          timerId = window.setTimeout(() => {
              if (hasScrolledPastThreshold && !hasPostedEnquiryRef.current) {
                  setShowProactiveAssistant(true);
              }
          }, 20000); // 20 seconds
      }

      return () => {
          window.removeEventListener('scroll', handleScroll);
          if (timerId) {
              clearTimeout(timerId);
          }
      };

  }, [currentPage, isAdminLoggedIn]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const openAuthModal = (view: 'login' | 'signup') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeAuthModal();
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

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    navigate('adminDashboard');
  };
  
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    simulationTriggered.current = false; // Reset the simulation trigger on logout
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

  const handleNewEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'status' | 'userName' | 'userEmail' | 'userMobile' | 'userCompany' | 'userLocation'>) => {
      setHasPostedEnquiry(true);
      setShowProactiveAssistant(false);
      const newEnquiry: Enquiry = {
          ...enquiryData,
          id: Date.now(),
          status: 'New',
          userName: user?.name || 'N/A',
          userEmail: user?.email || 'N/A',
          userMobile: user?.mobile || 'N/A',
          userCompany: user?.company || 'N/A',
          userLocation: user?.location || 'N/A',
      };
      setEnquiries(prev => [newEnquiry, ...prev]);
  };

  // Admin routing
  if (currentPage === 'adminLogin') {
    return <AdminLoginPage onAdminLogin={handleAdminLoginSuccess} />;
  }
  if (currentPage === 'adminDashboard') {
    return isAdminLoggedIn 
      ? <AdminDashboard 
          unmatchedSearches={unmatchedSearches} 
          onAdminLogout={handleAdminLogout}
          products={products}
          setProducts={setProducts}
          banners={banners}
          setBanners={setBanners}
          vendors={vendors}
          setVendors={setVendors}
          enquiries={enquiries}
          setEnquiries={setEnquiries}
        />
      : <AdminLoginPage onAdminLogin={handleAdminLoginSuccess} />;
  }


  const renderUserPage = () => {
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
            <HeroSection banners={banners} />
            <EnquirySection 
              isLoggedIn={isLoggedIn} 
              prefilledEnquiry={prefilledEnquiry}
              clearPrefilledEnquiry={clearPrefilledEnquiry}
              onNewEnquiry={handleNewEnquiry}
              onLoginRequest={() => openAuthModal('login')}
            />
            <ProductCatalog
              products={products}
              isLoggedIn={isLoggedIn}
              onEnquiryPrefill={handleEnquiryPrefill}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              onFilterChange={setFilteredProductsCount}
            />
            <VendorSection vendors={vendors}/>
            <FeedbackSection />
            <FaqSection />
            <BantyAssistant
              onSearch={setSearchTerm}
              filteredProductsCount={filteredProductsCount}
              onCantFind={() => handleEnquiryPrefill("I was looking for a specific solution but couldn't find it. Can you help me?")}
            />
            {showProactiveAssistant && (
                <ProactiveAssistant
                    user={user}
                    onHelpClick={() => {
                        handleEnquiryPrefill("I was looking for a solution but couldn't find it. Can you help me?");
                        setShowProactiveAssistant(false);
                    }}
                    onClose={() => setShowProactiveAssistant(false)}
                />
            )}
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
        isAuthModalOpen={isAuthModalOpen}
        authModalView={authModalView}
        onOpenAuthModal={openAuthModal}
        onCloseAuthModal={closeAuthModal}
      />
      <main className="flex-grow">
        {renderUserPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
