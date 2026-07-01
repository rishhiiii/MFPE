import React from 'react';
import PolicyLayout, { PolicySection, PolicyList, PolicyContact } from '../components/policy/PolicyLayout';

const RefundPolicy = () => {
  return (
    <PolicyLayout
      title="Cancellation &"
      highlight="Refund Policy"
      subtitle="Our policy on order cancellations, returns, and refunds."
      lastUpdated="1 July 2026"
    >
      <PolicySection>
        <p>
          At Mahaveer Food Products &amp; Exporters, we want you to be satisfied with your purchase.
          As we deal in food products, this policy explains when orders can be cancelled and when
          refunds or replacements are available, in line with food safety and hygiene requirements.
        </p>
      </PolicySection>

      <PolicySection heading="1. Order Cancellation">
        <PolicyList
          items={[
            'You may cancel your order before it has been dispatched by contacting us as soon as possible with your order details.',
            'Once an order has been dispatched, it can no longer be cancelled, but you may be eligible for a refund or replacement under the conditions below.',
            'We reserve the right to cancel any order due to product unavailability, pricing errors, or suspected fraudulent activity. In such cases, any amount paid will be refunded in full.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="2. Refunds & Replacements">
        <p>
          Because our products are perishable food items, we are able to offer refunds or replacements
          only in the following cases:
        </p>
        <PolicyList
          items={[
            'The product delivered is damaged or defective;',
            'You received an incorrect or wrong item;',
            'The product was not delivered within a reasonable time due to a fault on our side.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="3. Non-Returnable Items">
        <p>
          For reasons of health, safety, and hygiene, food products that have been opened, used, or
          are no longer in their original sealed condition cannot be returned or refunded, except
          where they are found to be damaged, defective, or incorrect as described above.
        </p>
      </PolicySection>

      <PolicySection heading="4. How to Request a Refund or Replacement">
        <PolicyList
          items={[
            'Contact us within 48 hours of delivery with your order number and details of the issue.',
            'Please share clear photographs of the product and packaging (including an unboxing image where possible) so we can verify the claim.',
            'Once your request is reviewed and approved, we will arrange a replacement or process a refund.',
          ]}
        />
      </PolicySection>

      <PolicySection heading="5. Refund Processing">
        <p>
          Approved refunds are processed to your original payment method through Razorpay. Once
          initiated, refunds typically reflect in your account within 5–7 business days, depending on
          your bank or payment provider. We will notify you once the refund has been initiated.
        </p>
      </PolicySection>

      <PolicySection heading="6. Failed or Duplicate Payments">
        <p>
          If an amount is deducted from your account but your order is not confirmed, or if you are
          charged more than once for the same order, please contact us. Verified failed or duplicate
          transactions will be refunded in full to the original payment method.
        </p>
      </PolicySection>

      <PolicySection heading="7. Contact Us">
        <p>For any cancellation, refund, or replacement request, please contact us:</p>
        <PolicyContact />
      </PolicySection>
    </PolicyLayout>
  );
};

export default RefundPolicy;
