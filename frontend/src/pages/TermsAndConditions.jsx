import React from 'react';
import PolicyLayout, { PolicySection, PolicyList, PolicyContact } from '../components/policy/PolicyLayout';

const TermsAndConditions = () => {
  return (
    <PolicyLayout
      title="Terms &"
      highlight="Conditions"
      subtitle="Please read these terms carefully before using our website or placing an order."
      lastUpdated="1 July 2026"
    >
      <PolicySection>
        <p>
          These Terms &amp; Conditions ("Terms") govern your access to and use of the website
          operated by Mahaveer Food Products &amp; Exporters ("we", "us", "our"), and any purchase
          of products through it. By accessing this website or placing an order, you agree to be
          bound by these Terms. If you do not agree, please do not use this website.
        </p>
      </PolicySection>

      <PolicySection heading="1. Eligibility">
        <p>
          You must be at least 18 years of age and capable of entering into a legally binding
          contract to place an order on this website. By placing an order, you confirm that the
          information you provide is accurate and complete.
        </p>
      </PolicySection>

      <PolicySection heading="2. Products & Pricing">
        <PolicyList
          items={[
            'All products are subject to availability. We may modify or discontinue any product without prior notice.',
            'We make every effort to display product descriptions, images, and prices accurately. Minor variations in colour, appearance, or packaging may occur as our products are natural and made in traditional batches.',
            'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.',
            'We reserve the right to correct any pricing errors and to change prices at any time before your order is accepted.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="3. Orders & Acceptance">
        <p>
          Your order constitutes an offer to purchase. An order is confirmed only after successful
          payment and an order confirmation from us. We reserve the right to accept or decline any
          order at our discretion, including where products are unavailable, where there is a
          pricing error, or where we suspect fraudulent activity.
        </p>
      </PolicySection>

      <PolicySection heading="4. Payments">
        <p>
          Payments on this website are processed securely through Razorpay, our third-party payment
          gateway. We accept the payment methods supported by Razorpay, including credit/debit cards,
          net banking, UPI, and wallets. By making a payment, you agree to Razorpay's terms and
          policies in addition to ours. We do not store your card or banking credentials on our
          servers.
        </p>
      </PolicySection>

      <PolicySection heading="5. Shipping, Cancellations & Refunds">
        <p>
          Delivery of products is governed by our Shipping &amp; Delivery Policy, and cancellations
          and refunds are governed by our Cancellation &amp; Refund Policy. Please review these
          policies, which form part of these Terms.
        </p>
      </PolicySection>

      <PolicySection heading="6. User Accounts">
        <PolicyList
          items={[
            'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.',
            'You agree to provide accurate, current, and complete information and to keep it updated.',
            'We reserve the right to suspend or terminate accounts that violate these Terms or are used for unlawful purposes.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="7. Intellectual Property">
        <p>
          All content on this website, including text, logos, graphics, images, and product
          descriptions, is the property of Mahaveer Food Products &amp; Exporters or its licensors
          and is protected by applicable intellectual property laws. You may not reproduce,
          distribute, or use any content without our prior written permission.
        </p>
      </PolicySection>

      <PolicySection heading="8. Prohibited Use">
        <p>You agree not to use this website to:</p>
        <PolicyList
          items={[
            'Engage in any unlawful, fraudulent, or harmful activity;',
            'Interfere with or disrupt the website, servers, or networks;',
            'Attempt to gain unauthorised access to any part of the website or another user\'s account;',
            'Upload or transmit viruses or any malicious code.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="9. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Mahaveer Food Products &amp; Exporters shall not be
          liable for any indirect, incidental, or consequential damages arising from your use of this
          website or products purchased through it. Our total liability for any claim shall not exceed
          the amount paid by you for the product giving rise to the claim.
        </p>
      </PolicySection>

      <PolicySection heading="10. Indemnity">
        <p>
          You agree to indemnify and hold harmless Mahaveer Food Products &amp; Exporters and its
          representatives from any claims, losses, or expenses arising out of your breach of these
          Terms or your misuse of the website.
        </p>
      </PolicySection>

      <PolicySection heading="11. Governing Law & Jurisdiction">
        <p>
          These Terms are governed by the laws of India. Any disputes arising in connection with
          these Terms shall be subject to the exclusive jurisdiction of the courts located in
          Bhopal, Madhya Pradesh, India.
        </p>
      </PolicySection>

      <PolicySection heading="12. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Any changes will be posted on this page with a
          revised "Last updated" date. Your continued use of the website after changes are posted
          constitutes acceptance of the revised Terms.
        </p>
      </PolicySection>

      <PolicySection heading="13. Contact Us">
        <p>If you have any questions about these Terms, please contact us:</p>
        <PolicyContact />
      </PolicySection>
    </PolicyLayout>
  );
};

export default TermsAndConditions;
