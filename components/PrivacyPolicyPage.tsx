
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl animate-fade-in-up">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-xl text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="mt-12 prose prose-lg text-gray-600 mx-auto">
          <p>
            Welcome to BANT Confirm. We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, phone number, and job title, that you voluntarily give to us when you register with the platform or when you post an enquiry.
            </li>
            <li>
              <strong>Enquiry Data:</strong> Information you provide when posting a requirement, which may include details about your business needs, budget, timeline, and other project-specific information.
            </li>
            <li>
              <strong>Usage Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Facilitate the BANT qualification process.</li>
            <li>Connect you with relevant vendors based on your enquiry.</li>
            <li>Email you regarding your account or order.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Notify you of updates to the Site.</li>
          </ul>

          <h2>3. Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul>
            <li>
              <strong>To Vendors:</strong> Once your enquiry is BANT qualified, we will share the details of your enquiry, along with your contact information, with a limited number of vetted vendors (typically up to three) so they can provide you with proposals.
            </li>
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law.
            </li>
          </ul>

          <h2>4. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You can review and change your information by logging into your account settings. If you wish to delete your account, please contact us.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@bantconfirm.com" className="text-blue-600 hover:underline">privacy@bantconfirm.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
