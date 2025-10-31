
import React, { useState, useEffect } from 'react';

const CheckmarkIcon = () => (
    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

interface EnquirySectionProps {
    isLoggedIn: boolean;
    prefilledEnquiry: string;
    clearPrefilledEnquiry: () => void;
}

interface FormData {
    enquiryText: string;
    budget: string;
    authority: string;
    need: string;
    timeline: string;
}

const EnquirySection: React.FC<EnquirySectionProps> = ({ isLoggedIn, prefilledEnquiry, clearPrefilledEnquiry }) => {
  const [formData, setFormData] = useState<FormData>({ enquiryText: '', budget: '', authority: '', need: '', timeline: ''});
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledEnquiry) {
      setFormData(prev => ({ ...prev, enquiryText: prefilledEnquiry }));
      document.getElementById('enquiryText')?.focus();
      clearPrefilledEnquiry();
    }
  }, [prefilledEnquiry, clearPrefilledEnquiry]);

  const sendConfirmationEmail = (data: FormData) => {
    // In a real application, this would integrate with an email sending service.
    console.log("--- Sending Confirmation Email ---");
    console.log("To: user@example.com"); // This would be the logged-in user's email.
    console.log("Subject: Your BANT Confirm Enquiry has been received!");
    console.log("\nBody:");
    console.log("Hello,");
    console.log("\nThank you for posting your requirement on BANT Confirm.");
    console.log("\nHere's a summary of your submission:");
    console.log(`> "${data.enquiryText}"`);
    if (data.budget) console.log(`- Budget: ${data.budget}`);
    if (data.authority) console.log(`- Authority: ${data.authority}`);
    if (data.need) console.log(`- Need: ${data.need}`);
    if (data.timeline) console.log(`- Timeline: ${data.timeline}`);
    console.log("\nWhat's next?");
    console.log("1. Our team will review your requirement.");
    console.log("2. We will match you with up to three of our trusted vendors.");
    console.log("3. You will receive proposals directly from these vendors within 48-72 hours.");
    console.log("\nThank you for choosing BANT Confirm.");
    console.log("---------------------------------");
  };

  const handlePostEnquiry = () => {
    setError('');
    if (!isLoggedIn) {
      alert('Please log in or create an account to post an enquiry.');
      return;
    }
    if (!formData.enquiryText.trim()) {
        setError('Please describe your requirement before submitting.');
        return;
    }

    console.log('Submitting enquiry:', formData);
    sendConfirmationEmail(formData);

    setIsSubmitted(true);
    setFormData({ enquiryText: '', budget: '', authority: '', need: '', timeline: ''});
  };

  const postAnother = () => {
    setIsSubmitted(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  };

  return (
    <section id="enquiry-section" className="py-12 bg-white animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Have an IT or Software Requirement?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Post your needs below and get matched with top vendors. It's fast, free, and you could earn a commission!</p>
        <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-inner min-h-[150px] p-4 sm:p-6 transition-transform duration-300 hover:scale-[1.02]">
          {isSubmitted ? (
            <div className="text-center animate-fade-in">
              <CheckmarkIcon />
              <h3 className="text-xl font-bold text-green-600">Thank You! Your Enquiry is Submitted.</h3>
              <p className="text-gray-600 mt-2">A confirmation has been sent to your email. We will connect you with top vendors shortly.</p>
              <button 
                onClick={postAnother} 
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                Post another enquiry
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4 text-left">
                <div>
                    <label htmlFor="enquiryText" className="sr-only">Your Requirement</label>
                    <textarea
                        id="enquiryText"
                        value={formData.enquiryText}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        rows={3}
                        placeholder="Describe your requirement in detail. Or, select a product below to start."
                        aria-invalid={!!error}
                        aria-describedby="enquiry-error"
                    ></textarea>
                    {error && <p id="enquiry-error" className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <details className="group pt-2">
                  <summary className="list-none flex items-center cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    <svg className="w-4 h-4 mr-2 transform group-open:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    Add BANT Parameters (Optional)
                  </summary>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 animate-fade-in">
                      <div>
                          <label htmlFor="budget" className="sr-only">Budget (Optional)</label>
                          <input type="text" id="budget" value={formData.budget} onChange={handleChange} placeholder="Budget (e.g., ₹5,00,000)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"/>
                      </div>
                      <div>
                          <label htmlFor="authority" className="sr-only">Authority (Optional)</label>
                          <input type="text" id="authority" value={formData.authority} onChange={handleChange} placeholder="Decision Maker (e.g., CTO, IT Head)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"/>
                      </div>
                      <div>
                          <label htmlFor="need" className="sr-only">Need (Optional)</label>
                          <input type="text" id="need" value={formData.need} onChange={handleChange} placeholder="Primary Need (e.g., Improve Sales)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"/>
                      </div>
                      <div>
                          <label htmlFor="timeline" className="sr-only">Timeline (Optional)</label>
                          <input type="text" id="timeline" value={formData.timeline} onChange={handleChange} placeholder="Timeline (e.g., Within 3 months)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"/>
                      </div>
                  </div>
                </details>
              
                <button
                  onClick={handlePostEnquiry}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 animate-pulse"
                >
                  Post Enquiry
                </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
