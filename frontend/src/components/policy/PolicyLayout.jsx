import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

// Shared chrome for all legal/policy pages so they stay visually consistent
// and easy to maintain. Matches the site's brand-cream / brand-brown styling.
const PolicyLayout = ({ title, highlight, subtitle, lastUpdated, children }) => {
  return (
    <div className="pt-40 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-full mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
            {title} {highlight && <span className="text-brand-brown">{highlight}</span>}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          )}
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-gray-100"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

// A titled section within a policy page.
export const PolicySection = ({ heading, children }) => (
  <section className="mb-8 last:mb-0">
    {heading && (
      <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-3">{heading}</h2>
    )}
    <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>
  </section>
);

// A styled bullet list for policy points.
export const PolicyList = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-2 w-1.5 h-1.5 bg-brand-brown rounded-full flex-shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

// Reusable contact block shown at the bottom of every policy page.
export const PolicyContact = () => (
  <div className="mt-4 p-6 bg-brand-cream/40 rounded-2xl border border-gray-100 space-y-3">
    <p className="font-medium text-gray-900">Mahaveer Food Products &amp; Exporters</p>
    <div className="flex items-center gap-3 text-gray-700">
      <Mail className="w-5 h-5 text-brand-brown flex-shrink-0" />
      <a href="mailto:mahaveermfpe@gmail.com" className="hover:text-brand-brown transition-colors">
        mahaveermfpe@gmail.com
      </a>
    </div>
    <div className="flex items-center gap-3 text-gray-700">
      <Phone className="w-5 h-5 text-brand-brown flex-shrink-0" />
      <a href="tel:+919669993888" className="hover:text-brand-brown transition-colors">
        +91 9669993888
      </a>
    </div>
    <div className="flex items-start gap-3 text-gray-700">
      <MapPin className="w-5 h-5 text-brand-brown flex-shrink-0 mt-0.5" />
      <span>Link Road No. 3, Kolar Road, Bhopal, Madhya Pradesh 462003, India</span>
    </div>
  </div>
);

export default PolicyLayout;
