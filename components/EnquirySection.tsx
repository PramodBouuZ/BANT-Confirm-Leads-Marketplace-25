import React, { useState } from 'react';

const CheckmarkIcon = () => (
    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const EnquirySection: React.FC = () => {
  const [isLoggedIn] = useState(true); // Simulate user is logged in for demo
  const [enquiryText, setEnquiryText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePostEnquiry = () => {
    setError('');
    if (!isLoggedIn) {
      alert('Please log in or create an account to proceed.');
      return;
    }
    if (!enquiryText.trim()) {
        setError('Please describe your requirement before submitting.');
        return;
    }

    console.log('Submitting enquiry:', enquiryText);
    setIsSubmitted(true);
    setEnquiryText('');
  };

  const postAnother = () => {
    setIsSubmitted(false);
  }

  return (
    <section className="py-12 bg-white animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Have an IT or Software Requirement?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Post your needs below and get matched with top vendors. It's fast, free, and you could earn a commission!</p>
        <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-inner min-h-[150px] flex items-center justify-center p-4 transition-transform duration-300 hover:scale-[1.02]">
          {isSubmitted ? (
            <div className="text-center animate-fade-in">
              <CheckmarkIcon />
              <h3 className="text-xl font-bold text-green-600">Thank You! Your Enquiry is Submitted.</h3>
              <p className="text-gray-600 mt-2">We will connect you with top vendors shortly.</p>
              <button 
                onClick={postAnother} 
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                Post another enquiry
              </button>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <textarea
                  value={enquiryText}
                  onChange={e => setEnquiryText(e.target.value)}
                  className="w-full sm:flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  rows={2}
                  placeholder="For example: 'I need a CRM software for a 50-person sales team with a budget of ₹4,00,000...'"
                  aria-invalid={!!error}
                  aria-describedby="enquiry-error"
                ></textarea>
                <button
                  onClick={handlePostEnquiry}
                  className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 animate-pulse"
                >
                  Post Enquiry
                </button>
              </div>
              {error && <p id="enquiry-error" className="text-red-500 text-sm mt-2 text-left">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;