
import React, { useState, useEffect } from 'react';
import { User } from '../App';

interface ProfilePageProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    onUpdateUser(formData);
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const renderField = (label: string, id: keyof User, value: string, type: string = "text") => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      {isEditing ? (
        <input
          type={type}
          id={id}
          value={formData[id]}
          onChange={handleChange}
          disabled={id === 'email'}
          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${id === 'email' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      ) : (
        <p className="mt-1 text-lg text-gray-900">{value}</p>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center animate-fade-in-down">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">My Profile</h1>
          <p className="mt-4 text-xl text-gray-500">View and manage your personal information.</p>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg animate-fade-in-up">
            {successMessage && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md animate-fade-in" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            <div className="space-y-6">
              {renderField("Full Name", "name", user.name)}
              {renderField("Email Address", "email", user.email, "email")}
              {renderField("Mobile Number", "mobile", user.mobile, "tel")}
              {renderField("Company Name", "company", user.company)}
              {renderField("Location", "location", user.location)}
            </div>
            
            <div className="mt-8 border-t pt-6 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
