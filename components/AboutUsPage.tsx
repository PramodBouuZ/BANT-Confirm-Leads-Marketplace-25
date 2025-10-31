
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center animate-fade-in-down">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            About <span className="text-blue-600">BANT</span><span className="text-yellow-400">Confirm</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Reshaping the B2B Tech Marketplace for Clarity and Growth.
          </p>
        </div>

        <div className="mt-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="relative animate-fade-in-right">
              <img
                className="rounded-lg shadow-xl"
                src="https://picsum.photos/600/400?random=31"
                alt="Our Team"
              />
            </div>

            <div className="mt-12 lg:mt-0 animate-fade-in-left">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Story</h2>
              <p className="mt-4 text-lg text-gray-500">
                In the bustling world of B2B technology, we saw a recurring problem: a disconnect. Business owners and IT teams struggled to find solutions that fit their precise needs, while vendors wasted resources chasing unqualified leads. BANT Confirm was born from a simple idea: what if we could build a marketplace that valued quality over quantity? A platform for every user—from the end-user to the company owner—that did the groundwork to ensure every connection was meaningful, efficient, and poised for success.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 bg-gray-50 rounded-lg p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-2xl font-bold text-blue-600">Our Mission</h3>
                    <p className="mt-3 text-lg text-gray-500">
                        To empower businesses by creating the most efficient and trustworthy B2B marketplace. We are committed to streamlining the tech procurement process for buyers and delivering high-intent, BANT-qualified leads to vendors, fostering a community built on transparency and mutual growth for every company.
                    </p>
                </div>
                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-2xl font-bold text-yellow-500">Our Vision</h3>
                    <p className="mt-3 text-lg text-gray-500">
                        To be the definitive global platform where every B2B technology transaction begins. We envision a future where finding the right software or IT solution is a seamless, intelligent, and rewarding experience for every business, from startup to enterprise-level company.
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-24 text-center bg-blue-50 rounded-lg p-12 animate-fade-in-up">
             <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">For Sales Professionals & Partners</h2>
             <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                Are you a sales professional or consultant with a customer requirement that falls outside your current company's product portfolio? Don't let a valuable lead for an end-user go to waste. Post your customer's enquiry on BANT Confirm. If the lead converts into a successful sale with one of our vendors, you can earn up to a 10% commission. Turn your network into an opportunity and ensure your client finds the best solution for their business.
             </p>
        </div>
        
        <div className="mt-24 text-center">
             <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight animate-fade-in-up">The BANT Advantage</h2>
             <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                We pre-qualify every lead across four key pillars to ensure business owners, sales professionals, and enterprise companies only engage in meaningful conversations.
             </p>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {['Budget', 'Authority', 'Need', 'Timeline'].map((item, index) => (
                     <div key={item} className="p-8 bg-white rounded-lg shadow-lg animate-zoom-in" style={{ animationDelay: `${150 * index}ms` }}>
                        <h3 className="text-xl font-bold text-blue-600">{item.charAt(0)}</h3>
                        <p className="mt-2 text-lg font-semibold text-gray-800">{item}</p>
                        <p className="mt-2 text-gray-500">
                            {
                                item === 'Budget' ? 'Ensuring the financial resources are allocated for the purchase.' :
                                item === 'Authority' ? 'Confirming the decision-making power to buy.' :
                                item === 'Need' ? 'Validating a genuine requirement for the solution.' :
                                'Defining a clear timeframe for implementation.'
                            }
                        </p>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;