
import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../App';

const featureDescriptions: { [key: string]: string } = {
  'Lead Management': 'Track and manage potential customers from initial contact to final sale.',
  'Sales Automation': 'Automate repetitive sales tasks like follow-up emails and data entry.',
  'Analytics Dashboard': 'Visualize your sales data with customizable charts and reports to gain actionable insights.',
  'Finance & Accounting': 'Manage your company\'s financial data, including ledgers, payables, receivables, and reporting.',
  'Inventory Control': 'Monitor stock levels, track orders, and manage the entire inventory lifecycle.',
  'HR Management': 'Streamline HR processes from payroll and benefits to performance and recruiting.',
  'Threat Detection': 'Proactively identify and respond to potential cybersecurity threats in real-time.',
  'Firewall Protection': 'Create a secure barrier between your internal network and untrusted external networks.',
  'Endpoint Security': 'Secure laptops, desktops, and mobile devices from malware and cyberattacks.',
  'Interactive Dashboards': 'Create dynamic, clickable reports that allow users to explore data visually.',
  'Data Visualization': 'Transform raw data into easily understandable graphs and charts.',
  'Predictive Analytics': 'Use historical data and machine learning to predict future trends and outcomes.',
  'Payroll Processing': 'Automate employee salary calculation, tax deductions, and payment disbursement.',
  'Attendance Tracking': 'Digitally monitor employee work hours, breaks, and time off.',
  'Performance Review': 'Set goals, gather feedback, and conduct employee performance evaluations systematically.',
  'Kanban Boards': 'Visualize workflows and track task progress through different stages.',
  'Gantt Charts': 'Plan and schedule projects over time, showing dependencies between tasks.',
  'Time Tracking': 'Record time spent on tasks and projects for accurate billing and productivity analysis.',
};

const parsePrice = (priceStr: string): number => {
  if (priceStr.toLowerCase().includes('free')) return 0;
  if (priceStr.toLowerCase().includes('custom')) return -1; // Special value for custom pricing
  const match = priceStr.match(/(\d[\d,]*)/);
  return match ? parseInt(match[1].replace(/,/g, ''), 10) : -1;
};

interface ProductCatalogProps {
  products: Product[];
  onEnquiryPrefill: (text: string) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onFilterChange: (count: number) => void;
  isLoggedIn: boolean;
}

const ProductCard: React.FC<{ product: Product, animationDelay: string, onPostEnquiry: () => void, onScheduleDemo: () => void, isLoggedIn: boolean }> = ({ product, animationDelay, onPostEnquiry, onScheduleDemo, isLoggedIn }) => (
  <div 
    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition-transform duration-300 opacity-0 animate-zoom-in"
    style={{ animationDelay, animationFillMode: 'forwards' }}
  >
    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
      {isLoggedIn && <p className="text-xs text-gray-400 italic -mt-1 mb-2">by {product.vendor}</p>}
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">{product.price}</p>
      <ul className="text-sm text-gray-600 space-y-1 mb-6 list-disc list-inside">
        {product.features.map((feature) => (
          <li key={feature} className="relative group cursor-help">
            {feature}
            {featureDescriptions[feature] && (
              <div 
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 shadow-lg"
              >
                {featureDescriptions[feature]}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={onPostEnquiry} className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
          Post Enquiry
        </button>
        <button onClick={onScheduleDemo} className="w-full bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition">
          Schedule Demo
        </button>
      </div>
    </div>
  </div>
);

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onEnquiryPrefill, searchTerm, onSearchTermChange, onFilterChange, isLoggedIn }) => {
  const uniqueFeatures = useMemo(() => {
    const allFeatures = new Set<string>();
    products.forEach(p => p.features.forEach(f => allFeatures.add(f)));
    return Array.from(allFeatures).sort();
  }, [products]);

  const maxPrice = useMemo(() => {
    return Math.max(
        ...products.map(p => parsePrice(p.price)).filter(p => p !== -1)
    );
  }, [products]);

  const [priceRange, setPriceRange] = useState<number>(maxPrice);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    setPriceRange(maxPrice);
  }, [maxPrice]);

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev =>
        prev.includes(feature)
            ? prev.filter(f => f !== feature)
            : [...prev, feature]
    );
  };

  const handlePostEnquiry = (productName: string) => {
    onEnquiryPrefill(`I'm interested in ${productName}. Please provide more details.`);
    document.getElementById('enquiry-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScheduleDemo = (productName: string) => {
    onEnquiryPrefill(`I would like to schedule a demo for ${productName}.`);
    document.getElementById('enquiry-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearchTerm = searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearchTerm) return false;

      const productPrice = parsePrice(product.price);
      const matchesPrice = productPrice === -1 || productPrice <= priceRange;
      if (!matchesPrice) return false;
      
      const matchesFeatures = selectedFeatures.length === 0 ||
        selectedFeatures.every(feature => product.features.includes(feature));
      if (!matchesFeatures) return false;

      return true;
    });
  }, [searchTerm, priceRange, selectedFeatures, products]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filteredProducts.length);
    }
  }, [filteredProducts, onFilterChange]);

  return (
    <section id="products" className="py-16 bg-gray-100 overflow-hidden animate-fade-in-up">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">Search by products</h2>
        <p className="text-sm text-gray-500 text-center mb-8 max-w-2xl mx-auto">Browse our curated catalog of software for businesses of all sizes, from startups to enterprise-level companies. The perfect tools for your IT and technical teams.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 opacity-0 animate-fade-in-left" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-1">Search Products</label>
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search by name, category, or feature..."
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="lg:col-span-1 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                        Max Price: <span className="font-bold text-blue-600">₹{priceRange.toLocaleString('en-IN')}</span>
                    </label>
                    <input
                        id="price-range"
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 mt-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div className="lg:col-span-2 opacity-0 animate-fade-in-right" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    <details className="group">
                        <summary className="flex justify-between items-center text-sm font-medium text-gray-700 cursor-pointer list-none -mb-2 group-open:mb-2">
                            <span>Filter by Features</span>
                            <svg className="w-5 h-5 transition-transform transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </summary>
                        <div className="overflow-hidden transition-all duration-500 ease-in-out max-h-0 group-open:max-h-96">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 pt-2">
                                {uniqueFeatures.map(feature => (
                                    <div key={feature} className="flex items-center">
                                        <input
                                            id={`feature-${feature}`}
                                            type="checkbox"
                                            checked={selectedFeatures.includes(feature)}
                                            onChange={() => handleFeatureChange(feature)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-600">
                                            {feature}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </details>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard 
                key={product.id} 
                product={product} 
                isLoggedIn={isLoggedIn}
                animationDelay={`${100 * (index % 3)}ms`} 
                onPostEnquiry={() => handlePostEnquiry(product.name)}
                onScheduleDemo={() => handleScheduleDemo(product.name)}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-600 mt-8 p-8 bg-white rounded-lg shadow-md animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-800">No Products Found</h3>
            {searchTerm ? (
              <p className="mt-2">We couldn't find any products matching your search for "{searchTerm}".</p>
            ) : (
              <p className="mt-2">No products match the current filter criteria.</p>
            )}
            <p className="mt-4">
              Can't find what you're looking for?{' '}
              <button 
                onClick={() => onEnquiryPrefill(searchTerm ? `I searched for "${searchTerm}" but couldn't find a matching solution.` : `I couldn't find a suitable product.`)} 
                className="font-medium text-blue-600 hover:underline"
              >
                Post an enquiry
              </button>
              {' '} and our team will help you.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
