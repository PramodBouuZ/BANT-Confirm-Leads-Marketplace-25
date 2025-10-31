import React, { useState, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  features: string[];
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'ProCRM Suite',
    category: 'CRM Software',
    price: '₹3,999/user/month',
    features: ['Lead Management', 'Sales Automation', 'Analytics Dashboard'],
    imageUrl: 'https://picsum.photos/400/300?random=11',
  },
  {
    id: 2,
    name: 'CloudERP Enterprise',
    category: 'ERP Solution',
    price: 'Custom Pricing',
    features: ['Finance & Accounting', 'Inventory Control', 'HR Management'],
    imageUrl: 'https://picsum.photos/400/300?random=12',
  },
  {
    id: 3,
    name: 'CyberGuard Security',
    category: 'Cybersecurity',
    price: '₹79,999/year',
    features: ['Threat Detection', 'Firewall Protection', 'Endpoint Security'],
    imageUrl: 'https://picsum.photos/400/300?random=13',
  },
  {
    id: 4,
    name: 'DataVizz Pro',
    category: 'Business Intelligence',
    price: '₹5,800/user/month',
    features: ['Interactive Dashboards', 'Data Visualization', 'Predictive Analytics'],
    imageUrl: 'https://picsum.photos/400/300?random=14',
  },
  {
    id: 5,
    name: 'ConnectFlow HRMS',
    category: 'HR Software',
    price: '₹650/employee/month',
    features: ['Payroll Processing', 'Attendance Tracking', 'Performance Review'],
    imageUrl: 'https://picsum.photos/400/300?random=15',
  },
  {
    id: 6,
    name: 'AgileSprint Project Mgmt',
    category: 'Project Management',
    price: 'Free Tier Available',
    features: ['Kanban Boards', 'Gantt Charts', 'Time Tracking'],
    imageUrl: 'https://picsum.photos/400/300?random=16',
  },
];

const parsePrice = (priceStr: string): number => {
  if (priceStr.toLowerCase().includes('free')) return 0;
  if (priceStr.toLowerCase().includes('custom')) return -1; // Special value for custom pricing
  const match = priceStr.match(/(\d[\d,]*)/);
  return match ? parseInt(match[1].replace(/,/g, ''), 10) : -1;
};

const ProductCard: React.FC<{ product: Product, animationDelay: string }> = ({ product, animationDelay }) => (
  <div 
    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 opacity-0 animate-zoom-in"
    style={{ animationDelay, animationFillMode: 'forwards' }}
  >
    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">{product.price}</p>
      <ul className="text-sm text-gray-600 space-y-1 mb-6 list-disc list-inside">
        {product.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row gap-2">
        <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
          Post Enquiry
        </button>
        <button className="w-full bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition">
          Schedule Demo
        </button>
      </div>
    </div>
  </div>
);

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueFeatures = useMemo(() => {
    const allFeatures = new Set<string>();
    mockProducts.forEach(p => p.features.forEach(f => allFeatures.add(f)));
    return Array.from(allFeatures).sort();
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(
        ...mockProducts.map(p => parsePrice(p.price)).filter(p => p !== -1)
    );
  }, []);

  const [priceRange, setPriceRange] = useState<number>(maxPrice);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev =>
        prev.includes(feature)
            ? prev.filter(f => f !== feature)
            : [...prev, feature]
    );
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
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
  }, [searchTerm, priceRange, selectedFeatures]);

  return (
    <section id="products" className="py-16 bg-gray-100 overflow-hidden animate-fade-in-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Explore Our Product Catalog</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Find the right software and IT solutions for your business needs.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-fade-in-left">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                    <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-1">Search Products</label>
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search by name, category, or feature..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="lg:col-span-1">
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

                <div className="lg:col-span-2">
                    <details className="group">
                        <summary className="flex justify-between items-center text-sm font-medium text-gray-700 cursor-pointer list-none -mb-2 group-open:mb-2">
                            <span>Filter by Features</span>
                            <svg className="w-5 h-5 transition-transform transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </summary>
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
                    </details>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} animationDelay={`${100 * (index % 3)}ms`} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8 animate-fade-in">No products found matching your search criteria.</p>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;