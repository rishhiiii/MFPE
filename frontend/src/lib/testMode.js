// Test mode lets the frontend run without a live backend by serving dummy
// products (see src/data/dummyProducts.js). Turn it on by setting
// VITE_TEST_MODE=true in the frontend .env before building. Leave it off/unset
// in normal operation so the real backend products are used.
export const TEST_MODE = import.meta.env.VITE_TEST_MODE === 'true';
