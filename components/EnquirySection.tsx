
import React, { useState } from 'react';

const EnquirySection: React.FC = () => {
  const [isLoggedIn] = useState(false); // Simulate user login state

  const handlePostEnquiry = () => {
    if (!isLoggedIn) {
      alert('Please log in or create an account to proceed.');
    } else {
      // Proceed with enquiry logic
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Have an IT or Software Requirement?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Post your needs below and get matched with top vendors. It's fast, free, and you could earn a commission!</p>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-inner">
          <textarea
            className="w-full sm:flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            rows={2}
            placeholder="For example: 'I need a CRM software for a 50-person sales team with a budget of $5000...'"
          ></textarea>
          <button
            onClick={handlePostEnquiry}
            className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Post Enquiry
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
