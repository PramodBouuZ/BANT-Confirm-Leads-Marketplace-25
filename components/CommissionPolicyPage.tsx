
import React from 'react';

const CommissionPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl animate-fade-in-up">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Commission Policy</h1>
          <p className="mt-4 text-xl text-gray-500">Rewarding you for valuable connections.</p>
        </div>

        <div className="mt-12 prose prose-lg text-gray-600 mx-auto">
          <p>
            At BANT Confirm, we believe in sharing our success with the users who make our platform valuable. Our Commission Policy is designed to reward customers who submit genuine, high-quality business requirements that lead to successful deals with our vendors.
          </p>

          <h2>1. Eligibility for Commission</h2>
          <p>
            To be eligible for a commission, the following conditions must be met:
          </p>
          <ul>
            <li>You must have a registered and verified account on the BANT Confirm platform.</li>
            <li>You must submit a genuine and detailed business requirement through the enquiry form on our platform.</li>
            <li>Your submitted enquiry must be successfully qualified by our team based on the BANT (Budget, Authority, Need, Timeline) criteria.</li>
            <li>The enquiry must result in a signed contract and completed financial transaction between you (the customer) and a vendor introduced to you through the BANT Confirm platform.</li>
            <li>The vendor must confirm the successful deal closure and payment with us.</li>
          </ul>

          <h2>2. Commission Structure</h2>
          <ul>
            <li>
              The commission is calculated as a percentage of the total deal value (excluding taxes) of the initial contract signed between you and the vendor.
            </li>
            <li>
              The standard commission rate is up to <strong>10%</strong>. The exact percentage may vary based on the deal size, product category, and specific agreements with our vendor partners.
            </li>
            <li>
              The final commission amount will be confirmed and communicated to you upon successful verification of the deal.
            </li>
          </ul>
          
          <h2>3. Payment Process</h2>
          <ul>
            <li>Commission payments are processed after the vendor confirms the deal and after the initial payment from you to the vendor has been successfully completed.</li>
            <li>Payments will be made within 45-60 days of deal confirmation.</li>
            <li>You will be required to provide valid bank account details and any necessary tax information (such as a PAN card in India) to facilitate the payment.</li>
            <li>All payments will be made via bank transfer.</li>
          </ul>

          <h2>4. Exclusions and Limitations</h2>
          <ul>
            <li>Commissions are not applicable on contract renewals, add-ons, or subsequent purchases made outside the initial deal facilitated by the platform.</li>
            <li>Enquiries deemed fraudulent, incomplete, or not meeting our quality standards will not be eligible for commission.</li>
            <li>BANT Confirm reserves the right to modify or terminate this commission policy at any time. Any changes will be updated on this page.</li>
          </ul>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions regarding our Commission Policy, please contact our support team at: <a href="mailto:commission@bantconfirm.com" className="text-blue-600 hover:underline">commission@bantconfirm.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommissionPolicyPage;
