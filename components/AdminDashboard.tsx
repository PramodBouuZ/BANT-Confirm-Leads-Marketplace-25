
import React from 'react';

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

interface AdminDashboardProps {
  unmatchedSearches: string[];
  onAdminLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ unmatchedSearches, onAdminLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
           <h1 className="text-xl font-bold text-gray-800">
             <span className="text-blue-600">Admin</span> Dashboard
           </h1>
           <button 
             onClick={onAdminLogout}
             className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-medium transition-colors"
           >
              <LogoutIcon /> Logout
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Welcome, Admin!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
            <p className="text-sm text-gray-500 mt-1">(Simulated Data)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Enquiries</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">567</p>
            <p className="text-sm text-gray-500 mt-1">(Simulated Data)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Products Listed</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">6</p>
            <p className="text-sm text-gray-500 mt-1">(Live Data)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Vendors</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">6</p>
            <p className="text-sm text-gray-500 mt-1">(Live Data)</p>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Unmatched Search Keywords</h3>
            {unmatchedSearches.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-600 max-h-64 overflow-y-auto">
                    {unmatchedSearches.map((term, index) => (
                        <li key={index} className="bg-gray-50 p-2 rounded-md">
                            <code>{term}</code>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No unmatched searches recorded yet.</p>
            )}
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
