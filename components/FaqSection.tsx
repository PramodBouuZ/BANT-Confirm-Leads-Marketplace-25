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
              <div className="overflow-hidden max-h-0 group-open:max-h-screen transition-all duration-500 ease-in-out">
                <p className="mt-4 text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
