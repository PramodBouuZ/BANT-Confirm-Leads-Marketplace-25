import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "BANT Confirm revolutionized how we find software. We got three proposals within 48 hours and found the perfect CRM. The commission was a great bonus!",
    author: "Rajesh Kumar",
    company: "Kumar Textiles",
    location: "Mumbai, India",
  },
  {
    quote: "As a small manufacturing unit, finding affordable and effective ERP solutions was a challenge. This platform connected us with a vendor who understood our needs perfectly.",
    author: "Priya Sharma",
    company: "Sharma Industries",
    location: "Pune, India",
  },
  {
    quote: "The lead quality is excellent. We closed two deals in our first month. The BANT qualification process saves our sales team a lot of time and effort.",
    author: "Amit Singh (Vendor)",
    company: "Innovatech Solutions",
    location: "Bengaluru, India",
  },
];

const animationClasses = ['animate-fade-in-left', 'animate-fade-in-up', 'animate-fade-in-right'];

const QuoteIcon = () => (
    <svg className="w-12 h-12 text-blue-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9.352 4C4.456 4 0 8.456 0 13.352c0 4.288 3.424 8.224 8.16 8.544.256.032.512.064.768.064.288 0 .576-.032.864-.064 4.736-.32 8.16-4.256 8.16-8.544C18.208 8.456 13.752 4 9.352 4zm0 14.72c-3.136 0-5.568-2.368-5.568-5.368s2.432-5.344 5.568-5.344c3.168 0 5.6 2.368 5.6 5.344s-2.432 5.368-5.6 5.368zM26.352 4c-4.896 0-9.352 4.456-9.352 9.352 0 4.288 3.424 8.224 8.16 8.544.256.032.512.064.768.064.288 0 .576-.032.864-.064 4.736-.32 8.16-4.256 8.16-8.544C35.208 8.456 30.808 4 26.352 4zm0 14.72c-3.136 0-5.568-2.368-5.568-5.368s2.432-5.344 5.568-5.344c3.168 0 5.6 2.368 5.6 5.344s-2.432 5.368-5.6 5.368z" />
    </svg>
);


const FeedbackSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-4">Trusted by Business Owners and IT Professionals</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Hear from company owners, end-users, and sales professionals who have found success on our platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
                key={index} 
                className={`bg-white p-8 rounded-lg shadow-lg relative opacity-0 ${animationClasses[index % animationClasses.length]}`}
                style={{ animationFillMode: 'forwards', animationDelay: `${100 * index}ms` }}
            >
              <div className="absolute top-0 left-0 -mt-4 -ml-4">
                <QuoteIcon />
              </div>
              <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              <div className="text-right">
                <p className="font-bold text-blue-600">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.company}, {testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;