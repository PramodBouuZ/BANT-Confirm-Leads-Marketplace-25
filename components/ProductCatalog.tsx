
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
    price: '$49/user/month',
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
    price: '$999/year',
    features: ['Threat Detection', 'Firewall Protection', 'Endpoint Security'],
    imageUrl: 'https://picsum.photos/400/300?random=13',
  },
  {
    id: 4,
    name: 'DataVizz Pro',
    category: 'Business Intelligence',
    price: '$70/user/month',
    features: ['Interactive Dashboards', 'Data Visualization', 'Predictive Analytics'],
    imageUrl: 'https://picsum.photos/400/300?random=14',
  },
  {
    id: 5,
    name: 'ConnectFlow HRMS',
    category: 'HR Software',
    price: '$8/employee/month',
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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
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

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return mockProducts;
    }
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <section id="products" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Explore Our Product Catalog</h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">Find the right software and IT solutions for your business needs.</p>
        
        <div className="mb-8 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search by product name, category, or feature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products found matching your search criteria.</p>
        )}
      </div>
    </section>
  );
};

export default ProductCatalog;
