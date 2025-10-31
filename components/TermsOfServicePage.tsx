
import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl animate-fade-in-up">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-xl text-gray-500">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="mt-12 prose prose-lg text-gray-600 mx-auto">
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the BANT Confirm website (the "Service") operated by BANT Confirm ("us", "we", or "our").
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            BANT Confirm is a B2B marketplace that connects customers seeking IT and software solutions with vendors. We qualify customer enquiries based on Budget, Authority, Need, and Timeline (BANT) to ensure high-quality lead generation for vendors.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service.
          </p>
          
          <h2>4. User Responsibilities</h2>
          <p>
             You agree not to use the Service to:
          </p>
          <ul>
            <li>Post any information that is false, misleading, or fraudulent.</li>
            <li>Infringe upon any third-party's copyright, patent, trademark, trade secret or other proprietary rights.</li>
            <li>Violate any law, statute, ordinance or regulation.</li>
            <li>Distribute viruses or any other technologies that may harm the Service or the interests or property of BANT Confirm users.</li>
          </ul>

          <h2>5. Commission Program</h2>
          <p>
            Customers who post a genuine requirement that results in a completed transaction between the customer and a vendor introduced via the Service may be eligible for a commission. The specific terms, conditions, and eligibility for the commission program are outlined in our separate Commission Policy.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of BANT Confirm and its licensors.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall BANT Confirm, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:legal@bantconfirm.com" className="text-blue-600 hover:underline">legal@bantconfirm.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
