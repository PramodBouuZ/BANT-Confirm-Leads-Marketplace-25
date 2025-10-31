
import React, { useState, useEffect } from 'react';
import { Product, Enquiry, EnquiryStatus } from '../App';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- Product Modal ---
interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({ name: '', category: '', vendor: '', price: '', features: [], imageUrl: '' });
    const [featuresStr, setFeaturesStr] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (product) {
            setFormData(product);
            setFeaturesStr(product.features.join(', '));
            setImagePreview(product.imageUrl);
        } else {
            setFormData({ name: '', category: '', vendor: '', price: '', features: [], imageUrl: '' });
            setFeaturesStr('');
            setImagePreview(null);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeaturesStr(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setFormData({ ...formData, imageUrl: result });
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a JPG or PNG file.');
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalProduct = {
            ...formData,
            id: product ? product.id : 0, // ID will be set in App.tsx for new products
            features: featuresStr.split(',').map(f => f.trim()).filter(f => f),
        };
        onSave(finalProduct);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4 transform animate-zoom-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{product ? 'Edit Product' : 'Add Product'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><CloseIcon /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded" required />
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
                    <input type="text" name="vendor" value={formData.vendor} onChange={handleChange} placeholder="Vendor" className="w-full p-2 border rounded" required />
                    <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price (e.g., ₹3,999/user/month)" className="w-full p-2 border rounded" required />
                    <input type="text" value={featuresStr} onChange={handleFeaturesChange} placeholder="Features (comma-separated)" className="w-full p-2 border rounded" />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Image (JPG, PNG)</label>
                        <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-md" />}
                    </div>
                    <div className="flex justify-end pt-4 space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Enquiry Modal ---
interface EnquiryModalProps {
  enquiry: Enquiry;
  vendors: string[];
  onClose: () => void;
  onSave: (enquiry: Enquiry) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ enquiry, vendors, onClose, onSave }) => {
    const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
    const [assignedVendor, setAssignedVendor] = useState(enquiry.assignedVendor || '');

    const handleSubmit = () => {
        onSave({ ...enquiry, status, assignedVendor: status === 'Assigned' ? assignedVendor : undefined });
        onClose();
    };

    const InfoField: React.FC<{label: string; value: string; fullWidth?: boolean}> = ({ label, value, fullWidth }) => (
        <div className={fullWidth ? 'md:col-span-2' : ''}>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-base text-gray-800">{value || 'N/A'}</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl m-4 transform animate-zoom-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b"><h2 className="text-xl font-bold text-gray-800">Enquiry Details (Read-Only)</h2><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><CloseIcon /></button></div>
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">User Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoField label="Name" value={enquiry.userName} />
                            <InfoField label="Email" value={enquiry.userEmail} />
                            <InfoField label="Mobile" value={enquiry.userMobile} />
                            <InfoField label="Company" value={enquiry.userCompany} />
                            <InfoField label="Location" value={enquiry.userLocation} fullWidth={true}/>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirement Details</h3>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Requirement</p>
                            <p className="text-base text-gray-800 whitespace-pre-wrap">{enquiry.enquiryText}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <InfoField label="Budget" value={enquiry.budget} />
                            <InfoField label="Authority" value={enquiry.authority} />
                            <InfoField label="Need" value={enquiry.need} />
                            <InfoField label="Timeline" value={enquiry.timeline} />
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Admin Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Update Status</label>
                                <select value={status} onChange={(e) => setStatus(e.target.value as EnquiryStatus)} className="w-full p-2 border rounded mt-1">
                                    <option>New</option><option>Approved</option><option>Rejected</option><option>Assigned</option>
                                </select>
                            </div>
                            {status === 'Assigned' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Assign to Vendor</label>
                                    <select value={assignedVendor} onChange={(e) => setAssignedVendor(e.target.value)} className="w-full p-2 border rounded mt-1">
                                        <option value="">Select a vendor</option>
                                        {vendors.map(v => <option key={v} value={v}>{v}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end p-4 bg-gray-50 rounded-b-lg space-x-2">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save Changes</button>
                </div>
            </div>
        </div>
    );
};


// --- Banner Modal (File Upload) ---
export const BannerModal: React.FC<{ onClose: () => void; onSave: (base64Image: string) => void; }> = ({ onClose, onSave }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState('');
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                setError('');
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setError('Please upload a valid JPG or PNG file.');
                setImagePreview(null);
            }
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (imagePreview) {
            onSave(imagePreview);
            onClose();
        } else {
            setError('Please select an image file to upload.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 transform animate-zoom-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b"><h2 className="text-xl font-bold text-gray-800">Add Banner</h2><button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600"><CloseIcon /></button></div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Banner Image (JPG, PNG)</label>
                        <input 
                            type="file" 
                            accept="image/jpeg, image/png" 
                            onChange={handleImageChange} 
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {imagePreview && (
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                            <img src={imagePreview} alt="Banner Preview" className="w-full h-auto max-h-48 object-contain rounded-md border" />
                        </div>
                    )}
                </div>
                <div className="flex justify-end p-4 bg-gray-50 rounded-b-lg space-x-2">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add Banner</button>
                </div>
            </form>
        </div>
    );
};


// --- Simple URL Modal (For Vendor) ---
interface UrlModalProps {
    title: string;
    label: string;
    onClose: () => void;
    onSave: (url: string) => void;
}

const UrlModal: React.FC<UrlModalProps> = ({ title, label, onClose, onSave }) => {
    const [url, setUrl] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url) {
            onSave(url);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 transform animate-zoom-in" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b"><h2 className="text-xl font-bold text-gray-800">{title}</h2><button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600"><CloseIcon /></button></div>
                <div className="p-6 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full p-2 border rounded" required />
                </div>
                <div className="flex justify-end p-4 bg-gray-50 rounded-b-lg space-x-2">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add</button>
                </div>
            </form>
        </div>
    )
};

export const VendorModal: React.FC<Omit<UrlModalProps, 'title' | 'label'>> = (props) => <UrlModal {...props} title="Add Vendor Logo" label="Vendor Logo URL" />;
