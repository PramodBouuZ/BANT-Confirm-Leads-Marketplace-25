
import React, { useState } from 'react';
import { Product, Banner, Vendor, Enquiry } from '../App';
import { ProductModal, EnquiryModal, BannerModal, VendorModal } from './AdminModals';

const LogoutIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>);
const DashboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>);
const BannerIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>);
const ProductIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm0 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6z" /></svg>);
const VendorIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>);
const EnquiryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>);


interface AdminDashboardProps {
  unmatchedSearches: string[];
  onAdminLogout: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  vendors: Vendor[];
  setVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
  enquiries: Enquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<Enquiry[]>>;
}

type AdminView = 'dashboard' | 'banners' | 'products' | 'vendors' | 'enquiries';

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
    const { unmatchedSearches, onAdminLogout, products, setProducts, banners, setBanners, vendors, setVendors, enquiries, setEnquiries } = props;
    const [currentView, setCurrentView] = useState<AdminView>('dashboard');
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
    const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
    const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

    const handleOpenProductModal = (product: Product | null) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleSaveProduct = (productData: Product) => {
        if (selectedProduct) { // Editing
            setProducts(products.map(p => p.id === productData.id ? productData : p));
        } else { // Adding
            setProducts([...products, { ...productData, id: Date.now() }]);
        }
    };
    
    const handleDeleteProduct = (productId: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    const handleOpenEnquiryModal = (enquiry: Enquiry) => {
        setSelectedEnquiry(enquiry);
        setIsEnquiryModalOpen(true);
    };

    const handleSaveEnquiry = (enquiryData: Enquiry) => {
        setEnquiries(enquiries.map(e => e.id === enquiryData.id ? enquiryData : e));
    };

    const handleSaveBanner = (bannerUrl: string) => {
        setBanners([...banners, { id: Date.now(), image: bannerUrl }]);
    };

    const handleDeleteBanner = (bannerId: number) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            setBanners(banners.filter(b => b.id !== bannerId));
        }
    };
    
    const handleSaveVendor = (logoUrl: string) => {
        setVendors([...vendors, { id: Date.now(), logoUrl }]);
    };

    const handleDeleteVendor = (vendorId: number) => {
        if (window.confirm("Are you sure you want to delete this vendor logo?")) {
            setVendors(vendors.filter(v => v.id !== vendorId));
        }
    };


    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <DashboardView unmatchedSearches={unmatchedSearches} stats={{users: 1234, enquiries: enquiries.length, products: products.length, vendors: vendors.length}} />;
            case 'banners':
                return <BannerManager banners={banners} onDelete={handleDeleteBanner} onAdd={() => setIsBannerModalOpen(true)} />;
            case 'products':
                return <ProductManager products={products} onEdit={handleOpenProductModal} onDelete={handleDeleteProduct} onAdd={() => handleOpenProductModal(null)} />;
            case 'vendors':
                return <VendorManager vendors={vendors} onDelete={handleDeleteVendor} onAdd={() => setIsVendorModalOpen(true)} />;
            case 'enquiries':
                return <EnquiryManager enquiries={enquiries} onView={handleOpenEnquiryModal} />;
            default:
                return null;
        }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={onAdminLogout} />
      <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-md w-full">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
               <h1 className="text-xl font-bold text-gray-800 capitalize">
                 <span className="text-blue-600">Admin</span> {currentView}
               </h1>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
              {renderContent()}
          </main>
      </div>
      {isProductModalOpen && <ProductModal product={selectedProduct} onClose={() => setIsProductModalOpen(false)} onSave={handleSaveProduct} />}
      {isEnquiryModalOpen && selectedEnquiry && <EnquiryModal enquiry={selectedEnquiry} vendors={vendors.map(v=>v.logoUrl.split('/')[1].split('.')[0])} onClose={() => setIsEnquiryModalOpen(false)} onSave={handleSaveEnquiry} />}
      {isBannerModalOpen && <BannerModal onClose={() => setIsBannerModalOpen(false)} onSave={handleSaveBanner} />}
      {isVendorModalOpen && <VendorModal onClose={() => setIsVendorModalOpen(false)} onSave={handleSaveVendor} />}
    </div>
  );
};

const Sidebar: React.FC<{currentView: AdminView, setCurrentView: (view: AdminView) => void, onLogout: () => void}> = ({currentView, setCurrentView, onLogout}) => {
    const navItemClasses = (view: AdminView) => `flex items-center px-4 py-2 mt-2 text-gray-100 transition-colors duration-200 transform rounded-md hover:bg-gray-700 ${currentView === view ? 'bg-gray-700' : ''}`;
    
    return (
        <aside className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-800">
            <h2 className="text-2xl font-bold text-white text-center">
                <span className="text-blue-500">BANT</span>
                <span className="text-yellow-400">Confirm</span>
            </h2>
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <button onClick={() => setCurrentView('dashboard')} className={navItemClasses('dashboard')}><DashboardIcon /> Dashboard</button>
                    <button onClick={() => setCurrentView('banners')} className={navItemClasses('banners')}><BannerIcon /> Banners</button>
                    <button onClick={() => setCurrentView('products')} className={navItemClasses('products')}><ProductIcon /> Products</button>
                    <button onClick={() => setCurrentView('vendors')} className={navItemClasses('vendors')}><VendorIcon /> Vendors</button>
                    <button onClick={() => setCurrentView('enquiries')} className={navItemClasses('enquiries')}><EnquiryIcon /> Enquiries</button>
                </nav>
                <button onClick={onLogout} className="flex items-center px-4 py-2 mt-4 text-gray-100 transition-colors duration-200 transform rounded-md hover:bg-red-500">
                   <LogoutIcon /> Logout
                </button>
            </div>
        </aside>
    );
};

const DashboardView: React.FC<{unmatchedSearches: string[], stats: any}> = ({ unmatchedSearches, stats }) => (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Welcome, Admin!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-semibold text-gray-700">Total Users</h3><p className="text-3xl font-bold text-blue-600 mt-2">{stats.users.toLocaleString()}</p><p className="text-sm text-gray-500 mt-1">(Simulated Data)</p></div>
          <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-semibold text-gray-700">Total Enquiries</h3><p className="text-3xl font-bold text-blue-600 mt-2">{stats.enquiries.toLocaleString()}</p><p className="text-sm text-gray-500 mt-1">(Live Data)</p></div>
          <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-semibold text-gray-700">Products Listed</h3><p className="text-3xl font-bold text-blue-600 mt-2">{stats.products.toLocaleString()}</p><p className="text-sm text-gray-500 mt-1">(Live Data)</p></div>
          <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-lg font-semibold text-gray-700">Vendors</h3><p className="text-3xl font-bold text-blue-600 mt-2">{stats.vendors.toLocaleString()}</p><p className="text-sm text-gray-500 mt-1">(Live Data)</p></div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Unmatched Search Keywords</h3>
            {unmatchedSearches.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-600 max-h-64 overflow-y-auto">{unmatchedSearches.map((term, index) => <li key={index} className="bg-gray-50 p-2 rounded-md"><code>{term}</code></li>)}</ul>
            ) : (<p className="text-gray-500">No unmatched searches recorded yet.</p>)}
        </div>
    </div>
);

const ProductManager: React.FC<{products: Product[], onEdit: (p: Product) => void, onDelete: (id: number) => void, onAdd: () => void}> = ({products, onEdit, onDelete, onAdd}) => (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Manage Products</h3>
            <button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add Product</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr><th className="px-6 py-3">Image</th><th className="px-6 py-3">Name</th><th className="px-6 py-3">Category</th><th className="px-6 py-3">Price</th><th className="px-6 py-3">Actions</th></tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4"><img src={p.imageUrl} alt={p.name} className="h-10 w-10 object-cover rounded-md"/></td>
                            <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                            <td className="px-6 py-4">{p.category}</td>
                            <td className="px-6 py-4">{p.price}</td>
                            <td className="px-6 py-4 space-x-2"><button onClick={() => onEdit(p)} className="font-medium text-blue-600 hover:underline">Edit</button><button onClick={() => onDelete(p.id)} className="font-medium text-red-600 hover:underline">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const EnquiryManager: React.FC<{enquiries: Enquiry[], onView: (e: Enquiry) => void}> = ({enquiries, onView}) => {
    const statusColor = { New: 'bg-blue-100 text-blue-800', Approved: 'bg-green-100 text-green-800', Rejected: 'bg-red-100 text-red-800', Assigned: 'bg-yellow-100 text-yellow-800' };
    return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Manage Enquiries</h3>
        {enquiries.length === 0 ? <p className="text-gray-500">No enquiries received yet.</p> : (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th className="px-6 py-3">User</th><th className="px-6 py-3">Enquiry</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Action</th></tr></thead>
                <tbody>
                    {enquiries.map(e => (
                    <tr key={e.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{e.userName}<br/><span className="text-xs text-gray-500">{e.userEmail}</span></td>
                        <td className="px-6 py-4 max-w-sm truncate">{e.enquiryText}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[e.status]}`}>{e.status}</span></td>
                        <td className="px-6 py-4"><button onClick={() => onView(e)} className="font-medium text-blue-600 hover:underline">View/Edit</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
    </div>
)};

const BannerManager: React.FC<{banners: Banner[], onDelete: (id: number) => void, onAdd: () => void}> = ({banners, onDelete, onAdd}) => (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-gray-700">Manage Banners</h3><button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add Banner</button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banners.map(b => (
                <div key={b.id} className="relative group"><img src={b.image} className="w-full h-32 object-cover rounded-md" /><div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => onDelete(b.id)} className="text-white bg-red-600 px-3 py-1 rounded-md">Delete</button></div></div>
            ))}
        </div>
    </div>
);

const VendorManager: React.FC<{vendors: Vendor[], onDelete: (id: number) => void, onAdd: () => void}> = ({vendors, onDelete, onAdd}) => (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-gray-700">Manage Vendors</h3><button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add Vendor Logo</button></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {vendors.map(v => (
                <div key={v.id} className="relative group border p-2 rounded-md flex items-center justify-center h-24"><img src={v.logoUrl} className="max-h-12" /><div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => onDelete(v.id)} className="text-white bg-red-600 px-3 py-1 rounded-md text-xs">Delete</button></div></div>
            ))}
        </div>
    </div>
);

export default AdminDashboard;
