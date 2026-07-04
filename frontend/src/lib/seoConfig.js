// Central SEO configuration for Mahaveer Food Products & Exporters.
// Edit business details here once; every page/meta tag reads from this.

export const SITE = {
  name: 'Mahaveer Food Products & Exporters',
  shortName: 'Mahaveer Food Products',
  // Production canonical origin (no trailing slash).
  url: 'https://mahaveerfoodproducts.com',
  tagline: "Bringing Nature's Best to the World",
  description:
    'Mahaveer Food Products & Exporters — premium organic jaggery, superfoods, spices, natural sweeteners, pulses, dry fruits and FMCG products. Wholesale supply and global export from Bhopal, India.',
  keywords: [
    'Mahaveer Food Products',
    'organic jaggery',
    'jaggery exporter India',
    'natural sweeteners',
    'organic superfoods',
    'spices exporter',
    'pulses and grains',
    'dry fruits',
    'FMCG products',
    'wholesale food supplier',
    'food exporter Bhopal',
  ],
  locale: 'en_IN',
  logo: '/mfpelogo.jpeg',
  // Social/share preview image. Swap for a dedicated 1200x630 image when available.
  ogImage: '/mfpelogo.jpeg',
  phone: '+91-9669993888',
  email: 'mahaveermfpe@gmail.com',
  whatsapp: '919669993888',
  address: {
    street: 'H.No. 4, Patrakar Colony, Link Road No. 3',
    locality: 'Bhopal',
    region: 'Madhya Pradesh',
    postalCode: '462003',
    country: 'IN',
  },
  // Add real profile URLs when available (Facebook, Instagram, LinkedIn, etc.)
  sameAs: [],
};

// Absolute URL helper.
export const absoluteUrl = (path = '/') => {
  if (!path) return SITE.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Per-route SEO metadata for static pages. Keyed by exact pathname.
// Dynamic pages (e.g. /product/:id) manage their own <Seo> inside the page.
export const ROUTE_SEO = {
  '/': {
    title: `${SITE.shortName} | Organic Jaggery, Superfoods & Global Food Export`,
    description: SITE.description,
    keywords: SITE.keywords,
  },
  '/shop': {
    title: 'Shop Organic Food Products',
    description:
      'Browse our range of premium organic jaggery, natural sweeteners, superfoods, spices, pulses, dry fruits and FMCG products. 100% organic, farm-sourced and export quality.',
    keywords: ['buy organic jaggery online', 'organic food shop', 'natural sweeteners', 'superfoods store'],
  },
  '/about': {
    title: 'About Us',
    description:
      'Learn about Mahaveer Food Products & Exporters — a Bhopal-based company delivering premium organic and FMCG food products to wholesale buyers and global markets.',
    keywords: ['about Mahaveer Food Products', 'organic food company India', 'food exporter Bhopal'],
  },
  '/contact': {
    title: 'Contact Us',
    description:
      'Get in touch with Mahaveer Food Products & Exporters, Bhopal. Call +91 9669993888 or email mahaveermfpe@gmail.com for orders, wholesale, and export enquiries.',
    keywords: ['contact Mahaveer Food Products', 'food supplier contact', 'wholesale enquiry'],
  },
  '/export': {
    title: 'Global Food Export',
    description:
      'Export-quality organic jaggery, spices, superfoods and FMCG products from India. Reliable global supply, compliant packaging and documentation for international buyers.',
    keywords: ['food export India', 'organic jaggery exporter', 'spice exporter', 'international food supplier'],
  },
  '/wholesale': {
    title: 'Wholesale Supply',
    description:
      'Bulk and wholesale supply of organic jaggery, natural sweeteners, spices, pulses and FMCG products at competitive prices for retailers and distributors across India.',
    keywords: ['wholesale food supplier', 'bulk jaggery supplier', 'wholesale organic products'],
  },
  '/blog': {
    title: 'Blog',
    description:
      'Insights, recipes and news on organic jaggery, natural sweeteners, healthy eating and the food export industry from Mahaveer Food Products.',
    keywords: ['jaggery benefits', 'organic food blog', 'healthy eating'],
  },
  '/services': {
    title: 'Our Services',
    description:
      'From sourcing and processing to private-label packaging, wholesale distribution and global export — discover the services offered by Mahaveer Food Products & Exporters.',
    keywords: ['food processing services', 'private label food', 'export services'],
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions',
    description: 'Terms and conditions for using the Mahaveer Food Products & Exporters website and services.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'How Mahaveer Food Products & Exporters collects, uses and protects your personal information.',
  },
  '/refund-policy': {
    title: 'Refund & Return Policy',
    description: 'Refund, return and cancellation policy for orders placed with Mahaveer Food Products & Exporters.',
  },
  '/shipping-policy': {
    title: 'Shipping Policy',
    description: 'Shipping, delivery timelines and charges for orders placed with Mahaveer Food Products & Exporters.',
  },
  // Utility / private pages — keep out of search results.
  '/cart': { title: 'Your Cart', noindex: true },
  '/wishlist': { title: 'Your Wishlist', noindex: true },
  '/checkout': { title: 'Checkout', noindex: true },
  '/login': { title: 'Login', noindex: true },
  '/signup': { title: 'Create Account', noindex: true },
  '/admin': { title: 'Admin', noindex: true },
};

// Site-wide structured data (also embedded statically in index.html for
// no-JS crawlers; kept here for reuse if needed).
export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl(SITE.logo),
  email: SITE.email,
  telephone: SITE.phone,
  description: SITE.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  sameAs: SITE.sameAs,
});
