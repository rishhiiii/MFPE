import React from 'react';
import PolicyLayout, { PolicySection, PolicyList, PolicyContact } from '../components/policy/PolicyLayout';

const PrivacyPolicy = () => {
  return (
    <PolicyLayout
      title="Privacy"
      highlight="Policy"
      subtitle="Your privacy matters to us. This policy explains how we collect, use, and protect your information."
      lastUpdated="3 July 2026"
    >
      <PolicySection>
        <p>
          Mahaveer Food Products &amp; Exporters ("we", "us", "our") is committed to protecting your
          privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your
          information when you visit our website or make a purchase. By using this website, you
          consent to the practices described here.
        </p>
      </PolicySection>

      <PolicySection heading="1. Information We Collect">
        <p>We may collect the following information:</p>
        <PolicyList
          items={[
            'Personal details you provide, such as your name, mobile number, email address, and shipping/billing address;',
            'Order history, including the products you purchase and your transaction records;',
            'Payment details, processed securely through our payment gateway (see “Payment Information” below);',
            'Account details if you register or sign in (including through Sign in with Google, which shares your name, email address and profile picture with us);',
            'Device and browser information, such as your IP address, browser type, and device details, collected automatically as you browse.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="2. How We Use Your Information">
        <PolicyList
          items={[
            'To process, fulfil, and deliver your orders;',
            'To send you order updates and provide customer support;',
            'To communicate with you about your inquiries and requests;',
            'To manage your account and provide a personalised experience;',
            'To improve our website, products, and services;',
            'To inform you about offers and promotions, only with your consent;',
            'To comply with legal obligations and prevent fraud.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="3. Payment Information">
        <p>
          All payments are processed securely through Razorpay, our third-party payment gateway. Your
          card details, banking credentials, and other sensitive payment information are collected and
          processed directly by Razorpay in accordance with their privacy policy and applicable data
          security standards (including PCI-DSS). We do not store or have access to your full card or
          banking details on our servers.
        </p>
      </PolicySection>

      <PolicySection heading="4. Cookies & Tracking">
        <p>
          Our website may use cookies and similar technologies to remember your preferences, keep
          items in your cart, and understand how visitors use the site. You can control or disable
          cookies through your browser settings, though some features of the website may not function
          properly without them.
        </p>
      </PolicySection>

      <PolicySection heading="5. Sharing & Disclosure">
        <p>We do not sell your personal information. We may share it only with:</p>
        <PolicyList
          items={[
            'Payment processors (Razorpay) to complete transactions;',
            'Shipping and logistics partners to deliver your orders;',
            'Service providers who help us operate our website and business, under confidentiality obligations;',
            'Authorities or third parties where required by law or to protect our legal rights.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="6. Data Security">
        <p>
          We implement reasonable technical and organisational measures to protect your information
          against unauthorised access, loss, or misuse. However, no method of transmission over the
          internet is completely secure, and we cannot guarantee absolute security.
        </p>
      </PolicySection>

      <PolicySection heading="7. Data Retention">
        <p>
          We retain your personal information only for as long as necessary to fulfil the purposes
          described in this policy, including to comply with legal, accounting, or reporting
          obligations.
        </p>
      </PolicySection>

      <PolicySection heading="8. Your Rights">
        <p>
          Subject to applicable law, you may request access to, correction of, or deletion of your
          personal information, and you may opt out of marketing communications at any time. To
          exercise these rights, please contact us using the details below.
        </p>
      </PolicySection>

      <PolicySection heading="9. Third-Party Links">
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices or content of those websites. We encourage you to review their privacy
          policies.
        </p>
      </PolicySection>

      <PolicySection heading="10. Children's Privacy">
        <p>
          Our website is not intended for individuals under the age of 18, and we do not knowingly
          collect personal information from children.
        </p>
      </PolicySection>

      <PolicySection heading="11. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with a revised "Last updated" date.
        </p>
      </PolicySection>

      <PolicySection heading="12. Contact Us">
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <PolicyContact />
      </PolicySection>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
