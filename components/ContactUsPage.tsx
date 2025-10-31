
import React, { useState } from 'react';

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.message) newErrors.message = 'Message is required.';
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Contact form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center animate-fade-in-down">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We'd love to hear from you. Whether you have a question, feedback, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-in-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
            {isSubmitted ? (
              <div className="text-center p-8 bg-green-50 rounded-lg">
                <h3 className="text-xl font-bold text-green-600">Thank You!</h3>
                <p className="text-gray-600 mt-2">Your message has been sent successfully. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company (Optional)</label>
                    <input type="text" id="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                     {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" rows={4} value={formData.message} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}></textarea>
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                <div className="mt-6">
                  <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105">
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="animate-fade-in-right">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Information</h2>
            <div className="space-y-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-800">Address</p>
                        <p className="text-gray-500">Noida, Uttar Pradesh 201301</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-800">Email</p>
                        <p className="text-gray-500">Info@bantconfirm.com</p>
                    </div>
                </div>
                <div className="flex items-start">
                     <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-800">Phone</p>
                        <p className="text-gray-500">+91-9310269821</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
                Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;