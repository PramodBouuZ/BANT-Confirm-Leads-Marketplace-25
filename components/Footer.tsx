
import React, { useState } from 'react';
import { Page } from '../App';

const SocialIcon: React.FC<{ href: string, path: string, title: string }> = ({ href, path, title }) => (
  <a href={href} className="text-gray-400 hover:text-white transition-transform transform hover:scale-125">
    <span className="sr-only">{title}</span>
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  </a>
);

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email is required.';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email address is invalid.';
    }
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      return 'Phone number is required.';
    }
    if (!/^\d{10}$/.test(phone)) {
      return 'Phone number must be 10 digits.';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);

    const emailValidationError = validateEmail(email);
    const phoneValidationError = validatePhone(phone);

    setEmailError(emailValidationError);
    setPhoneError(phoneValidationError);

    if (!emailValidationError && !phoneValidationError) {
      console.log('Form submitted:', { email, phone });
      setIsSubmitted(true);
      setEmail('');
      setPhone('');
    }
  };

  return (
    <footer className="bg-gray-800 text-white animate-fade-in-up">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <button onClick={() => onNavigate('home')} className="text-2xl font-bold text-left">
              <span className="text-blue-500">BANT</span>
              <span className="text-yellow-400">Confirm</span>
            </button>
            <p className="mt-4 text-gray-400 text-sm">
              Your trusted marketplace for B2B IT & Software, connecting businesses with verified leads.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white">About Us</button></li>
              <li><a href="#products" className="text-gray-400 hover:text-white">Product Catalog</a></li>
              <li><button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><button onClick={() => onNavigate('privacy')} className="text-gray-400 hover:text-white">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="text-gray-400 hover:text-white">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('commission')} className="text-gray-400 hover:text-white">Commission Policy</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Get In Touch</h3>
            {isSubmitted ? (
                <p className="mt-4 text-green-400 animate-fade-in">Thank you! We will get back to you shortly.</p>
            ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
                    <div>
                        <label htmlFor="footer-email" className="sr-only">Email address</label>
                        <input
                            type="email"
                            id="footer-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                            placeholder="Your email address"
                            required
                            aria-invalid={!!emailError}
                            aria-describedby="email-error"
                        />
                        {emailError && <p id="email-error" className="mt-1 text-xs text-red-400">{emailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="footer-phone" className="sr-only">Phone number</label>
                        <input
                            type="tel"
                            id="footer-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                            placeholder="10-digit phone number"
                            required
                            aria-invalid={!!phoneError}
                            aria-describedby="phone-error"
                        />
                        {phoneError && <p id="phone-error" className="mt-1 text-xs text-red-400">{phoneError}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors animate-pulse">
                        Submit
                    </button>
                </form>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} BANT Confirm. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <SocialIcon href="#" title="Twitter" path="M22.42 2.62a8.77 8.77 0 01-2.52.69 4.39 4.39 0 001.93-2.43 8.79 8.79 0 01-2.79 1.06 4.38 4.38 0 00-7.46 3.99A12.43 12.43 0 013.11 3.44a4.38 4.38 0 001.35 5.84 4.35 4.35 0 01-1.98-.55v.06a4.38 4.38 0 003.51 4.3 4.4 4.4 0 01-1.98.07 4.38 4.38 0 004.09 3.04 8.81 8.81 0 01-5.46 1.88A9.2 9.2 0 011 18.84a12.39 12.39 0 006.7 1.96c8.04 0 12.44-6.66 12.44-12.44 0-.19 0-.38-.01-.56a8.89 8.89 0 002.19-2.28z" />
            <SocialIcon href="#" title="Facebook" path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.09 15.59V12.7H8.59v-2.09h2.32v-1.57c0-2.3 1.4-3.57 3.46-3.57.99 0 1.84.07 2.09.11v1.98h-1.16c-1.12 0-1.33.53-1.33 1.3v1.74h2.59l-.34 2.09h-2.25v4.98h-2.48z" />
            <SocialIcon href="#" title="LinkedIn" path="M16.17 10.17h-2.24v6.66h-2.2v-6.66h-1.24v-2.1h1.24v-1.47c0-1.56.88-2.52 2.63-2.52h1.47v2.1h-.9c-.66 0-.75.31-.75.75v1.19h1.69l-.23 2.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
