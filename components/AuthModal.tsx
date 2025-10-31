
import React, { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: 'login' | 'signup';
  onAuthSuccess: () => void;
}

type AuthView = 'login' | 'signup' | 'forgotPassword';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView, onAuthSuccess }) => {
  const [view, setView] = useState<AuthView>(initialView);
  const [signupStep, setSignupStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', company: '', location: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setView(initialView);
        setSignupStep(1);
        setFormData({ name: '', email: '', mobile: '', company: '', location: '', password: '', confirmPassword: '' });
        setErrors({});
        setResetSuccess(false);
    }
  }, [isOpen, initialView]);
  
  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'modal-overlay') {
      onClose();
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (view === 'login') {
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
        if (!formData.password) newErrors.password = 'Password is required.';
    }
    
    if (view === 'signup') {
        if (signupStep === 1) {
            if (!formData.name) newErrors.name = 'Name is required.';
            if (!formData.email) {
                newErrors.email = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid.';
            }
            if (!formData.mobile) {
              newErrors.mobile = 'Mobile number is required.';
            } else if (!/^\d{10}$/.test(formData.mobile)) {
              newErrors.mobile = 'Mobile number must be 10 digits.';
            }
            if (!formData.password) {
                newErrors.password = 'Password is required.';
            } else if (formData.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters.';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match.';
            }
        } else if (signupStep === 2) {
            if (!formData.company) newErrors.company = 'Company name is required.';
            if (!formData.location) newErrors.location = 'Location is required.';
        }
    }

    if (view === 'forgotPassword') {
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid.';
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (view === 'login') {
        console.log(`Login successful with data:`, formData);
        onAuthSuccess();
      } else if (view === 'signup') {
        if (signupStep === 1) {
          console.log(`Signup step 1 successful with data:`, formData);
          setSignupStep(2);
        } else if (signupStep === 2) {
          console.log(`Signup step 2 successful with data:`, formData);
          onAuthSuccess();
        }
      } else if (view === 'forgotPassword') {
        console.log(`Password reset link sent to:`, formData.email);
        setResetSuccess(true);
      }
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const renderInput = (id: string, label: string, type: string, error: string | undefined) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            id={id}
            value={formData[id as keyof typeof formData]}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );

  const getTitle = () => {
    if (resetSuccess) return 'Check Your Email';
    if (view === 'login') return 'Login';
    if (view === 'forgotPassword') return 'Reset Password';
    if (view === 'signup') {
      return signupStep === 1 ? 'Create an Account' : 'Complete Your Profile';
    }
    return '';
  };

  const getButtonText = () => {
    if (isLoading) {
        return (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        );
    }
    if (view === 'login') return 'Login';
    if (view === 'forgotPassword') return 'Send Reset Link';
    if (view === 'signup') {
      return signupStep === 1 ? 'Continue' : 'Complete Signup';
    }
    return 'Submit';
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 transform animate-zoom-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
            {view === 'login' && (
                <>
                    {renderInput('email', 'Email Address', 'email', errors.email)}
                    {renderInput('password', 'Password', 'password', errors.password)}
                    <div className="text-right text-sm">
                        <button type="button" onClick={() => setView('forgotPassword')} className="font-medium text-blue-600 hover:underline">Forgot Password?</button>
                    </div>
                </>
            )}

            {view === 'signup' && signupStep === 1 && (
                <>
                    {renderInput('name', 'Full Name', 'text', errors.name)}
                    {renderInput('email', 'Email Address', 'email', errors.email)}
                    {renderInput('mobile', 'Mobile Number (10 digits)', 'tel', errors.mobile)}
                    {renderInput('password', 'Password', 'password', errors.password)}
                    {renderInput('confirmPassword', 'Confirm Password', 'password', errors.confirmPassword)}
                </>
            )}
            
            {view === 'signup' && signupStep === 2 && (
                <>
                    <p className="text-sm text-gray-600">Welcome, {formData.name}! Just one more step.</p>
                    {renderInput('company', 'Company Name', 'text', errors.company)}
                    {renderInput('location', 'Location', 'text', errors.location)}
                </>
            )}

            {view === 'forgotPassword' && (
                <>
                    {resetSuccess ? (
                        <div className="text-center">
                           <p className="text-gray-600">If an account with that email exists, we've sent instructions to reset your password.</p>
                        </div>
                    ) : (
                        <>
                           <p className="text-sm text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
                           {renderInput('email', 'Email Address', 'email', errors.email)}
                        </>
                    )}
                </>
            )}

            {!resetSuccess && (
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {getButtonText()}
                </button>
            )}
        </form>

        
          <div className="p-4 bg-gray-50 text-center text-sm rounded-b-lg">
              {view === 'login' && (
                  <span>Don't have an account? <button onClick={() => { setView('signup'); setSignupStep(1); }} className="font-medium text-blue-600 hover:underline">Sign up</button></span>
              )}
              {view === 'signup' && signupStep === 1 && (
                  <span>Already have an account? <button onClick={() => setView('login')} className="font-medium text-blue-600 hover:underline">Login</button></span>
              )}
              {view === 'forgotPassword' && (
                  <button onClick={() => setView('login')} className="font-medium text-blue-600 hover:underline">Back to Login</button>
              )}
          </div>
      </div>
    </div>
  );
};

export default AuthModal;
