
import React from 'react';

const faqs = [
  {
    question: "How does the platform work?",
    answer: "You post your IT or software requirement on our platform. We verify your enquiry based on BANT parameters and then match you with up to three of our trusted vendors who can meet your needs. You'll receive proposals directly from them."
  },
  {
    question: "What are the BANT parameters?",
    answer: "BANT stands for Budget, Authority, Need, and Timeline. We use this framework to qualify leads. This means we ensure you have a defined budget, the authority to make a purchase, a clear need for the product/service, and a specific timeline for implementation. This ensures vendors receive high-quality, actionable leads."
  },
  {
    question: "How can I earn money by posting an enquiry?",
    answer: "If you post a genuine requirement that leads to a successful deal between you and one of our vendors, you are eligible for a commission of up to 10% of the deal value. This is our way of thanking you for bringing business to the platform."
  },
  {
    question: "I'm a sales professional. Can I post an enquiry for my customer?",
    answer: "Absolutely! We encourage sales professionals and consultants to post enquiries on behalf of their clients for requirements that fall outside their company's portfolio. It's a powerful way to assist your customer while ensuring a qualified lead isn't lost. If your submitted enquiry results in a successful deal, you are eligible to receive up to 10% commission, as detailed in our Commission Policy. It's a win-win: your customer finds a trusted solution, and you are rewarded for the connection."
  },
   {
    question: "I'm a developer/IT manager. Can I find technical or enterprise-level solutions here?",
    answer: "Yes. Our platform is designed for technical and IT teams. You can find a wide range of enterprise-grade solutions, from cybersecurity and cloud infrastructure to developer tools and complex ERP systems. Post a detailed technical enquiry to get matched with vendors who understand your specific needs."
  },
  {
    question: "Is it free to post an enquiry?",
    answer: "Yes, it is completely free for customers to post their requirements on BANT Confirm. There are no hidden charges or fees for using our service to find vendors."
  },
  {
    question: "How are vendors selected?",
    answer: "All vendors on our platform are vetted for their quality of service, product reliability, and customer support. We only partner with reputable companies to ensure you receive the best possible solutions."
  }
];

const FaqSection: React.FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden animate-fade-in-up">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index} 
              className="group bg-gray-50 p-4 rounded-lg shadow-sm cursor-pointer"
            >
              <summary className="flex justify-between items-center font-medium text-gray-800 list-none group-hover:text-blue-600">
                {faq.question}
                <span className="transform group-open:rotate-180 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
              </summary>
              <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-400 ease-in-out">
                <div className="overflow-hidden">
                  <p className="mt-4 text-gray-600 opacity-0 group-open:opacity-100 transition-opacity duration-300 delay-150 ease-in-out">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;