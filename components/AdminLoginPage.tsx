
import React, { useState } from 'react';

interface AdminLoginPageProps {
  onAdminLogin: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulated admin credentials. In a real app, this would be an API call.
    if (username === 'admin' && password === 'admin123') {
      console.log('Admin login successful');
      onAdminLogin();
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-blue-500">BANT</span>
          <span className="text-yellow-400">Confirm</span>
        </h1>
        <h2 className="text-2xl font-semibold text-gray-300">Admin Panel</h2>
      </div>
      <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-lg p-8">
        <form onSubmit={handleLogin} noValidate>
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
