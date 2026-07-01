import React from 'react';
import PolicyLayout, { PolicySection, PolicyList, PolicyContact } from '../components/policy/PolicyLayout';

const ShippingPolicy = () => {
  return (
    <PolicyLayout
      title="Shipping &"
      highlight="Delivery Policy"
      subtitle="How and when we process, ship, and deliver your orders."
      lastUpdated="1 July 2026"
    >
      <PolicySection>
        <p>
          This Shipping &amp; Delivery Policy explains how Mahaveer Food Products &amp; Exporters
          processes and delivers orders placed on our website. By placing an order, you agree to the
          terms set out below.
        </p>
      </PolicySection>

      <PolicySection heading="1. Order Processing Time">
        <p>
          Orders are typically processed and dispatched within 2–5 business days after successful
          payment confirmation. Orders are not shipped or delivered on Sundays and public holidays.
          During periods of high demand, processing may take slightly longer.
        </p>
      </PolicySection>

      <PolicySection heading="2. Delivery Timelines">
        <p>
          Once dispatched, delivery timelines depend on your location and the courier partner.
          Estimated delivery times are as follows:
        </p>
        <PolicyList
          items={[
            'Metro and major cities: approximately 3–7 business days after dispatch;',
            'Other locations: approximately 5–10 business days after dispatch.',
          ]}
        />
        <p>
          These timelines are estimates and may vary due to factors beyond our control.
        </p>
      </PolicySection>

      <PolicySection heading="3. Shipping Charges">
        <p>
          Shipping charges, if applicable, are calculated based on the delivery location and order
          value and will be displayed at checkout before you complete your payment. Any applicable
          free-shipping offers will also be shown at checkout.
        </p>
      </PolicySection>

      <PolicySection heading="4. Order Tracking">
        <p>
          Where tracking is available, we will share tracking details via email, SMS, or WhatsApp
          once your order has been dispatched, so you can monitor its progress.
        </p>
      </PolicySection>

      <PolicySection heading="5. Delivery Areas">
        <p>
          We currently ship across India. For bulk, wholesale, or international export orders, please
          reach out to us directly through our Contact page so we can arrange delivery and provide a
          suitable quote.
        </p>
      </PolicySection>

      <PolicySection heading="6. Delays">
        <p>
          We are not responsible for delays caused by circumstances beyond our control, such as
          courier delays, adverse weather, natural events, strikes, or other force majeure events. In
          such cases, we will do our best to keep you informed and ensure your order reaches you.
        </p>
      </PolicySection>

      <PolicySection heading="7. Incorrect or Incomplete Address">
        <p>
          Please ensure your shipping address and contact details are accurate and complete. We are
          not responsible for orders that are delayed or undelivered due to an incorrect or incomplete
          address provided by the customer. Re-shipping charges may apply in such cases.
        </p>
      </PolicySection>

      <PolicySection heading="8. Contact Us">
        <p>For any questions about shipping or delivery, please contact us:</p>
        <PolicyContact />
      </PolicySection>
    </PolicyLayout>
  );
};

export default ShippingPolicy;
